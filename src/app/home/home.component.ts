
import { Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { getAnalytics, isSupported, logEvent } from 'firebase/analytics';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ContactComponent } from '../contact/contact.component';

interface ApiEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  imageUrl?: string;
  description?: string;
}

interface HomeEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  description?: string;
  image: string;
  imageSrcset: string | null;
  allDay: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    NgxSkeletonLoaderModule,
    ContactComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private readonly http = inject(HttpClient);

  private readonly eventsUrl =
    'https://get-week-of-events-k7ltwigbhq-ue.a.run.app';

  private readonly defaultImages = [
    '/matt-briney-2',
    '/your-second-default-image'
  ];

  readonly events = signal<HomeEvent[]>([]);
  readonly isLoading = signal(true);
  readonly hasError = signal(false);

  ngOnInit(): void {
    this.loadEvents();
  }

  private loadEvents(): void {
    this.isLoading.set(true);
    this.hasError.set(false);

    this.http
      .get<ApiEvent[] | Record<string, ApiEvent>>(this.eventsUrl)
      .subscribe({
        next: (response) => {
          const upcomingEvents = Object.values(response ?? {})
            .filter(event => event?.id && event?.start)
            .sort((a, b) =>
              new Date(a.start).getTime() -
              new Date(b.start).getTime()
            )
            .slice(0, 2);

          const usedImages = new Set<string>();

          // Reserve custom images before assigning fallbacks.
          const customImages = new Map<ApiEvent, string>();

          for (const event of upcomingEvents) {
            const customImage = event.imageUrl?.trim();

            if (!customImage) continue;

            const image = this.toDriveThumbnailUrl(customImage);

            if (!usedImages.has(image)) {
              customImages.set(event, image);
              usedImages.add(image);
            }
          }

          const events = upcomingEvents.map(event =>
            this.mapEvent(event, usedImages, customImages.get(event))
          );

          this.events.set(events);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Unable to load upcoming events:', error);

          this.hasError.set(true);
          this.isLoading.set(false);
        }
      });
  }

  private mapEvent(
    event: ApiEvent,
    usedImages: Set<string>,
    customImage?: string
  ): HomeEvent {
    let image: string;
    let imageSrcset: string | null = null;

    if (customImage) {
      image = customImage;
    } else {
      const fallback = this.getFallbackImage(
        event.title,
        usedImages
      );

      image = `${fallback}-s.jpg`;
      imageSrcset =
        `${fallback}-s.jpg 650w, ${fallback}-m.jpg 1920w`;

      usedImages.add(image);
      usedImages.add(`${fallback}-m.jpg`);
    }

    return {
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      description: event.description,
      allDay: /^\d{4}-\d{2}-\d{2}$/.test(event.start),
      image,
      imageSrcset
    };
  }

  private getFallbackImage(
    title: string,
    usedImages: Set<string>
  ): string {
    const preferredImage = this.getEventSpecificImage(title);

    const candidates = preferredImage
      ? [preferredImage, ...this.defaultImages]
      : this.defaultImages;

    const availableImage = candidates.find(image =>
      !usedImages.has(`${image}-s.jpg`) &&
      !usedImages.has(`${image}-m.jpg`)
    );

    if (!availableImage) {
      throw new Error('Not enough unique fallback event images.');
    }

    return availableImage;
  }

  private getEventSpecificImage(title: string): string | null {
    const normalized = title.trim().toLowerCase();

    switch (normalized) {
      case 'trinity wellness yoga':
        return '/chelsea-gates';

      case 'mah jong':
      case 'mahjong':
        return '/majong';

      case 'aa':
        return '/cody-silver';

      case 'meditative monday':
        return '/meditation';

      default:
        return normalized.includes('meditation')
          ? '/meditation'
          : null;
    }
  }

  private toDriveThumbnailUrl(url: string): string {
    try {
      const parsed = new URL(url);

      if (parsed.hostname !== 'drive.google.com') {
        return url;
      }

      const fileId =
        parsed.searchParams.get('id') ??
        parsed.pathname.match(/\/file\/d\/([^/]+)/)?.[1];

      if (!fileId) {
        return url;
      }

      const thumbnail = new URL(
        'https://drive.google.com/thumbnail'
      );

      thumbnail.searchParams.set('id', fileId);
      thumbnail.searchParams.set('sz', 'w1200');

      return thumbnail.toString();
    } catch {
      return url;
    }
  }

  async viewAllEventsClick(): Promise<void> {
    try {
      if (await isSupported()) {
        logEvent(getAnalytics(), 'click_view_all_events', {
          pageName: 'home'
        });
      }
    } catch (error) {
      console.warn('Unable to log analytics event:', error);
    }
  }
}

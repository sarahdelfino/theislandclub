import { Component, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
// import { Event } from '../event';
import { AlertComponent } from "../alert/alert.component";
import { getAnalytics, logEvent } from 'firebase/analytics';
import { FirebaseService } from '../firebase.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ContactComponent } from "../contact/contact.component";
import { FeaturedComponent } from "../featured/featured.component";

@Pipe({
  name: "safeHtml",
  standalone: true,
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(html: any) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SafeHtmlPipe, RouterLink, CommonModule, ReactiveFormsModule, NgxSkeletonLoaderModule, ContactComponent, AlertComponent, FeaturedComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  events: any[] = [];
  data$: any;
  contactForm: FormGroup;
  alertText = '';
  alertType = '';
  err = false;
  analytics = getAnalytics();
  isMobile = false;
  skelTheme = {
    width: '20vw',
    height: '90px',
    marginRight: '20px'
  };
  mobileSkelTheme = {
    height: '150px'
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    public firebaseService: FirebaseService,
  ) {
    if (window.innerWidth < 760) {
      this.isMobile = true;
    }
    this.http.get('https://get-week-of-events-k7ltwigbhq-ue.a.run.app').subscribe((resp: any) => {
      // this.http.get('http://127.0.0.1:5001/theislandclub/us-east1/get_week_of_events').subscribe((resp: any) => {
      const arr = [];
      for (const row in resp) {
        const tmp = {
          "start": resp[row].start,
          "end": resp[row].end,
          "id": resp[row].id,
          "title": resp[row].title,
          "img": resp[row].imageUrl ? this.toDriveThumbnailUrl(resp[row].imageUrl) : this.getImg(resp[row]),
          "description": resp[row]?.description
        }
        arr.push(tmp);
        arr.sort((a, b) => (a.start > b.start) ? 1 : (b.start > a.start) ? -1 : 0);
      }
      this.events.push(arr[0]);
      this.events.push(arr[1]);
      console.log(this.events)

    });
    
    this.contactForm = new FormGroup({
      submitDate: new FormControl(Date.now(), Validators.required),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [Validators.required, Validators.minLength(25)]),
    })

  }

  viewAllEventsClick() {
    logEvent(this.analytics, 'click_view_all_events', { pageName: 'home'} );
  }

  membershipBtnClick() {
    this.router.navigateByUrl('/membership');
  }

  getImg(data: any) {
    if (data.title === 'Trinity Wellness Yoga') {
      return '/chelsea-gates'
    } else if (data.title === 'Mah Jong') {
      return '/majong'
    } else if (data.title === 'AA') {
      return '/cody-silver'
    } else if (data.title.trim() === 'Meditative Monday' || data.title.includes('Meditation')) {
      return '/meditation'
    } else {
      return '/matt-briney-2'
    }
  }

  toDriveThumbnailUrl(url: string) {
  const match = url.match(/[?&]id=([^&]+)/);
  const fileId = match?.[1];

  if (!fileId) return url;

  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;
}
}

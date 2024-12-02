import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarComponent } from "@schedule-x/angular";
import { createCalendar, createViewMonthAgenda, createViewMonthGrid, createViewWeek, createViewDay, viewMonthAgenda, viewMonthGrid } from "@schedule-x/calendar";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, CalendarComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {

  constructor(private route: ActivatedRoute, private db: FirebaseService) {
    const id = this.route.snapshot.paramMap.get('id');
    if(id && this.route.snapshot.routeConfig?.path === 'events/:id/approve') {
      this.db.updateEventState(id);
      window.alert("Your approval has been processed. Thank you!");
    }
  }

  calendarApp = createCalendar({
    views: [createViewMonthAgenda(), createViewMonthGrid(), createViewWeek(), createViewDay()],
    defaultView: viewMonthAgenda.name || viewMonthGrid.name,
    plugins: [createEventModalPlugin()]
  });

  eventClick(event: any) {
    console.log("clicked!");
    const eventTitle = event.srcElement.innerText;
    let eventId;
    console.log(event);
    // if (event.target.classList.contains("sx__month-agenda-event__title")) {
    //     for (let ev in config.events) {
    //         if (config.events[ev].title === eventTitle) {
    //             eventId = config.events[ev].id;
    //         }
    //     }
    //     router.push(`/event/${eventId}`);
    // }
  }

}

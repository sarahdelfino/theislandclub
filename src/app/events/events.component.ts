import { Component } from '@angular/core';
import { CalendarComponent } from "@schedule-x/angular";
import { createCalendar, createViewMonthAgenda, createViewMonthGrid, createViewWeek, createViewDay, viewMonthAgenda, viewMonthGrid } from "@schedule-x/calendar";
import { createEventModalPlugin } from "@schedule-x/event-modal";

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CalendarComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {

  calendarApp = createCalendar({
  views: [createViewMonthAgenda(), createViewMonthGrid(), createViewWeek(), createViewDay() ],
  defaultView: viewMonthAgenda.name || viewMonthGrid.name,
  plugins: [createEventModalPlugin()],
  events:
  [
    {
      id: 1,
      title: 'Event 1',
      start: '2024-08-30 14:00',
      end: '2024-08-30 19:00'
    },
    {
      id: 2,
      title: 'Event 2',
      start: '2024-08-29 12:00',
      end: '2024-08-29 15:00'
    },
  ],
});

eventClick(event: any) {
  console.log("clicked!");
  let eventTitle = event.srcElement.innerText;
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

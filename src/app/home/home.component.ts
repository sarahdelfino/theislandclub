import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { Event } from '../event';
import { AlertComponent } from "../alert/alert.component";
import { FirebaseService } from '../firebase.service';
import { CalendarService } from '../calendar.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent, CommonModule, AlertComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  events: Array<Event>;

  constructor(
    private router: Router,
    public firebaseService: FirebaseService,
  ) {}

  async ngOnInit() {
    this.firebaseService.getEvents().valueChanges().subscribe((resp: any) => {
      let tmp = resp;
      for (let row in tmp) {
        tmp[row].date = this.formatDate(tmp[row].date);
        tmp[row].start = this.formatTime(tmp[row].start);
        tmp[row].end = this.formatTime(tmp[row].end);
      }
      this.events = tmp;
    });
  }

  membershipBtnClick() {
    this.router.navigateByUrl('/membership');
  }

  formatTime(data: any) {
    let hours = data[0] + data[1];
    let minutes = data[3] + data[4];
    let amOrPm = hours >= 12 ? 'pm' : 'am';
    hours = (hours % 12) || 12;
    let finalTime = hours + ':' + minutes + amOrPm;
    return finalTime;
  }

  formatDate(data: any) {
    let date = new Date(data);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    };
    const formattedDate: string = date.toLocaleDateString('en-US', options);
    return formattedDate;
  }

}

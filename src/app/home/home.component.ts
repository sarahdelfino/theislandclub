import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { Event } from '../event';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(
    private router: Router,
  ) {}

  events: Array<Event> = [
    {
      "id": 490238029,
      "title": "Test Event One",
      "description": "Test description one",
      "organizer": "Sarah Delf",
      "email": "blah@test.com",
      "date": this.getDate(),
      "start":"12:12",
      "end": "13:34",
      "state": "Pending approval",
      "phone": "867-5309"
  },
  {
      "id": 234565432,
      "title": "Test Event Two",
      "description": "Test description tew",
      "organizer": "Sarah Delf",
      "email": "blah@test.com",
      "date": this.getDate(),
      "start":"01:12",
      "end": "02:34",
      "state": "Pending approval",
      "phone": "867-5309"
  }
  ]

  membershipBtnClick() {
    this.router.navigateByUrl('/membership');
  }

  getDate() {
    let date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const formattedDate: string = date.toLocaleDateString(undefined, options);
    return formattedDate;
  }

}

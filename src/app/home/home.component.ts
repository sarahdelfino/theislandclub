import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { Event } from '../event';
import { AlertComponent } from "../alert/alert.component";
import { FirebaseService } from '../firebase.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent, CommonModule, AlertComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  events: any[] = [];
  data$: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    public firebaseService: FirebaseService,
  ) { }

  async ngOnInit() {    
    this.http.get('https://get-week-of-events-k7ltwigbhq-ue.a.run.app').subscribe((resp: any) => {
      let arr = [];
      for (let row in resp) {
        let tmp = {
          "date": this.formatDate(resp[row].start),
          "start": this.formatTime(resp[row].start),
          "end": this.formatTime(resp[row].end),
          "id": resp[row].id,
          "title": resp[row].title,
          "img": this.getImg(resp[row])
        }
        arr.push(tmp);
        arr.sort((a, b) => (a.date > b.date) ? 1 : (b.date > a.date) ? -1 : 0)
      }
      this.events.push(arr[0]);
      this.events.push(arr[1]);
    });
    
  }

  membershipBtnClick() {
    this.router.navigateByUrl('/membership');
  }

  formatTime(data: any) {
    let time = data.split(" ")[1]
    if (!time || undefined) {
      return '';
    }
    let hours = time[0] + time[1]
    let minutes = time[3] + time[4]
    let amOrPm = hours >= 12 ? 'pm' : 'am';
    hours = (hours % 12) || 12;
    let finalTime = hours + ':' + minutes + amOrPm;
    return finalTime
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

  getImg(data: any) {
    if (data.title === 'Trinity Wellness Yoga') {
      return '/chelsea-gates'
    } else if (data.title === 'Mah Jong') {
      return '/majong'
    } else {
      return '/matt-briney-2'
    }
  }

}

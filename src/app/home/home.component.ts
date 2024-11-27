import { Component } from '@angular/core';
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
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, AlertComponent, ReactiveFormsModule],
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

  constructor(
    private router: Router,
    private http: HttpClient,
    public firebaseService: FirebaseService,
  ) {
    this.http.get('https://get-week-of-events-k7ltwigbhq-ue.a.run.app').subscribe((resp: any) => {
      const arr = [];
      for (const row in resp) {
        const tmp = {
          "date": resp[row].start,
          "start": this.formatTime(resp[row].start),
          "end": this.formatTime(resp[row].end),
          "id": resp[row].id,
          "title": resp[row].title,
          "img": this.getImg(resp[row])
        }
        arr.push(tmp);
        arr.sort((a, b) => (a.date > b.date) ? 1 : (b.date > a.date) ? -1 : 0);
      }
      console.log(arr);
      arr[0].date = this.formatDate(arr[0].date);
      arr[1].date = this.formatDate(arr[1].date);
      this.events.push(arr[0]);
      this.events.push(arr[1]);
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

  formatTime(data: any) {
    const time = data.split(" ")[1]
    if (!time || undefined) {
      return '';
    }
    let hours = time[0] + time[1]
    const minutes = time[3] + time[4]
    const amOrPm = hours >= 12 ? 'pm' : 'am';
    hours = (hours % 12) || 12;
    const finalTime = hours + ':' + minutes + amOrPm;
    return finalTime
  }

  formatDate(data: any) {
    const date = new Date(data);
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
    } else if (data.title === 'AA') {
      return '/cody-silver'
    } else {
      return '/matt-briney-2'
    }
  }

  submit(e: Event) {
    const message = this.contactForm.value;
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    this.firebaseService.addMessage(message).then(() => {
      emailjs.sendForm("service_66ijhfa", "template_dk7f0b3", form, {
        publicKey: 'pp0s7qlmsjt-_40XH',
      }).catch((err) => {
        console.log("Unable to send message email: ", err);
        this.alertText = 'We were not able to process your submission at this time. Please try again.';
        this.err = true;
        this.alertType = 'err';
      });
    }).catch((err: any) => {
      this.alertText = 'We were not able to process your submission at this time. Please try again.';
      this.err = true;
      this.alertType = 'err';
      console.log('FAILED...', err);
    });
  }

  

}

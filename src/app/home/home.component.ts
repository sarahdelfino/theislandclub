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
import emailjs from '@emailjs/browser';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

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
  imports: [SafeHtmlPipe, RouterLink, CommonModule, AlertComponent, ReactiveFormsModule, NgxSkeletonLoaderModule],
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
          // "img": resp[row]?.attachment || this.getImg(resp[row]),
          "img": this.getImg(resp[row]),
          "attachment": resp[row]?.attachment,
          "description": resp[row]?.description
        }
        arr.push(tmp);
        arr.sort((a, b) => (a.start > b.start) ? 1 : (b.start > a.start) ? -1 : 0);
      }
      this.events.push(arr[0]);
      this.events.push(arr[1]);

      // console.log(this.events);

      // let firstTest = {
      //   "date": "December 2, 2024",
      //   "start": "6:00pm",
      //   "end": "7:15pm",
      //   "id": "6pgj6dhj6dh6ab9ncdj66b9kcgp3cbb16gs3gb9j6op68cr46oq3icr6ck@google.com",
      //   "title": "Meditative Monday",
      //   "img": '/matt-briney-2',
      //   "attachment": 'test attachment',
      //   "description": 'test description! this one should be longer. we shall see.'
      // }

      // let secondTest = {
      //   "date": "December 2, 2024",
      //   "start": "6:00pm",
      //   "end": "7:15pm",
      //   "id": "6pgj6dhj6dh6ab9ncdj66b9kcgp3cbb16gs3gb9j6op68cr46oq3icr6ck@google.com",
      //   "title": "Teen Yoga",
      //   "img": '/matt-briney-2',
      //   "attachment": 'test attachment',
      //   "description": 'Bring a yoga mat and join us for a little relaxation, mindfulness, and gentle flow through yoga postures. Members are able to bring a guest, since we know teens only tend to go places with friends 🙂Ages: 12-16'
      // }

      // this.events.push(firstTest);
      // this.events.push(secondTest);

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
    } else if (data.title.trim() === 'Meditative Monday' || data.title.includes('meditation')) {
      return '/meditation'
    } else {
      return '/matt-briney-2'
    }
  }

  submit(e: Event) {
    const message = this.contactForm.value;
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    this.firebaseService.addMessage(message).then(() => {
      emailjs.sendForm("service_lwdjtb9", "template_dk7f0b3", form, {
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

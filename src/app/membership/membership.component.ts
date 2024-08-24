import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { EventsComponent } from '../events/events.component';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { AlertComponent } from "../alert/alert.component";
import { Member } from '../member';
import { FirebaseService } from '../firebase.service';
import { Event as event } from '../event';

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [CommonModule, EventsComponent, AlertComponent],
  templateUrl: './membership.component.html',
  styleUrl: './membership.component.css'
})
export class MembershipComponent {

  constructor(private firebaseService: FirebaseService) {}

  @Input() scrollToEvents: false;

  alertText = '';
  alertType = '';
  err = false;
  success = false;

  signUpVisible = false;
  requestFormVisible = false;

  ngOnInit() {
    if (this.scrollToEvents) {
      let events = document.getElementById('events');
      events?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  toggleSignup() {
    this.requestFormVisible = false;
    this.signUpVisible = !this.signUpVisible;
  }

  toggleRequest() {
    this.signUpVisible = false;
    this.requestFormVisible = !this.requestFormVisible;
  }

  submit(e: Event) {
    e.preventDefault();
    let form = e.target as HTMLFormElement;
    if (form['mem_type']) {
      const member = new Member (form['first_name'].value, form['last_name'].value, form['email'].value, form['address'].value, form['mem_type'].value, form['phone'].value
      );
      this.firebaseService.addMember(member);
      let memberType = form['mem_type'].value;
      emailjs.sendForm("service_66ijhfa", "template_de4aoh4", form, {
        publicKey: 'pp0s7qlmsjt-_40XH',
      }).then(() => {
        form.reset();
        this.success = true;
        this.alertText = 'Your submission has been received!';
        this.alertType = 'success';
        setTimeout(() => {
          this.success = false;
        }, 8000);
        let url = '';
        if (memberType === 'individual') {
          url = 'https://buy.stripe.com/bIYaEG5Ce1gs5Uc7ss';
        } else {
          url = 'https://buy.stripe.com/eVa28ae8K0cociA146';
        }
        window.open(url, '_blank')?.focus();
      },
        (error) => {
          this.alertText = 'We were not able to process your submission at this time. Please try again.';
          this.err = true;
          this.alertType = 'err';
          console.log('FAILED...', error);
        }
      );
    } else {
      const submittedEvent = new event(Date.now().toString(), form['event_name'].value, form['event_date'].value, form['event_start'].value, form['event_end'].value, form['event_description'].value, form['first_name'].value + ' ' + form['last_name'].value, form['email'].value, 'pending approval', form['phone'].value);
      this.firebaseService.addEvent(submittedEvent);
      emailjs
        .sendForm('service_66ijhfa', 'template_jfj2cqe', form, {
          publicKey: 'pp0s7qlmsjt-_40XH',
        })
        .then(
          () => {
            this.success = true;
            this.alertText = 'Your submission has been received!';
            this.alertType = 'success';
            form.reset();
            setTimeout(() => {
              this.success = false;
            }, 2000);
          },
          (error) => {
            this.alertText = 'We were not able to process your submission at this time. Please try again.';
            this.err = true;
            this.alertType = 'err';
            console.log('FAILED...', error);
          },
        );
    }
    let alert = document.getElementById('buttons');
    alert?.scrollIntoView({ behavior: 'smooth' });
  }
}

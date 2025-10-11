import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AlertComponent } from '../alert/alert.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { eventSubmission } from '../eventSubmission';
import { FirebaseService } from '../firebase.service';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-request-event',
  standalone: true,
  imports: [CommonModule, AlertComponent, ReactiveFormsModule],
  templateUrl: './request-event.component.html',
  styleUrl: './request-event.component.css'
})
export class RequestEventComponent {
  private firebaseService = inject(FirebaseService);

    alertText = '';
  alertType = '';
  err = false;
  success = false;
  errorText = '';

  eventForm = new FormGroup({
      submitDate: new FormControl(Date.now()),
      url: new FormControl(''),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      eventType: new FormControl('', [Validators.required]),
      eventDate: new FormControl('', [Validators.required]),
      startTime: new FormControl('', [Validators.required]),
      endTime: new FormControl('', [Validators.required]),
      eventName: new FormControl('', [Validators.required]),
      eventDescription: new FormControl('', [Validators.required]),
      agreeRules: new FormControl(null, [Validators.requiredTrue])
    });


      submitEvent(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (this.eventForm.invalid) {
      this.errorText = 'Please ensure all necessary values are provided.';
    } else {
      this.errorText = '';
      const submittedEvent = new eventSubmission(Date.now().toString(), form['event_name'].value, form['event_date'].value, form['event_start'].value, form['event_end'].value, form['event_description'].value, form['first_name'].value + ' ' + form['last_name'].value, form['email'].value, 'pending approval', form['phone'].value);
          this.firebaseService.addEvent(submittedEvent).then((resp: any) => {
          let host = window.location.host;
          let ht;
          if (host === 'localhost:4200') {
            host = 'http://' + host;
          } else {
            host = 'https://' + host;
          }
          const id = resp.key;
          form['url'].value = host + '/events/' + id + '/approve';
        });
        emailjs
          .sendForm('service_lwdjtb9', 'template_jfj2cqe', form, {
            publicKey: 'pp0s7qlmsjt-_40XH',
          })
          .then(
            () => {
              this.success = true;
              this.alertText = 'Your submission has been received!';
              this.alertType = 'success';
              //send email to admins
              emailjs.sendForm('service_lwdjtb9', 'template_6r1j5k9', form, {
                publicKey: 'pp0s7qlmsjt-_40XH',
              }).then(
                (response) => {
                  console.log('SUCCESS!', response.status, response.text);
                },
                (error) => {
                  console.log('FAILED...', error);
                },
              );
              form.reset();
              setTimeout(() => {
                this.success = false;
              }, 5000);
            },
            (error) => {
              this.alertText = 'We were not able to process your submission at this time. Please try again.';
              this.err = true;
              this.alertType = 'err';
              console.log('FAILED...', error);
            },
          );
    }
  }
}

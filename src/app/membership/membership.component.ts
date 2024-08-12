import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EventsComponent } from '../events/events.component';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { AlertComponent } from "../alert/alert.component";

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [CommonModule, EventsComponent, AlertComponent],
  templateUrl: './membership.component.html',
  styleUrl: './membership.component.css'
})
export class MembershipComponent {

  alertText = '';
  alertType = '';
  err = false;
  success = false;

  signUpVisible = false;
  requestFormVisible = false;

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
      let memberType = form['mem_type'].value;
      emailjs.sendForm("service_66ijhfa", "template_de4aoh4", form, {
        publicKey: 'pp0s7qlmsjt-_40XH',
      }).then(() => {
        this.success = true;
        this.alertText = 'Your submission has been received!';
        this.alertType = 'success';
        setTimeout(() => {
          this.success = false;
        }, 2000);
        form.reset();
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
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EventsComponent } from '../events/events.component';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [CommonModule, EventsComponent],
  templateUrl: './membership.component.html',
  styleUrl: './membership.component.css'
})
export class MembershipComponent {

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

submitMembership(e: Event) {
  e.preventDefault();
  // submit membership to firebase
  // console.log("error: ", error.value, " success: ", success.value);
  emailjs.sendForm("service_66ijhfa", "template_de4aoh4", e.target as HTMLFormElement, {
      publicKey: 'pp0s7qlmsjt-_40XH',
  }).then(() => {
    console.log("huzzah~!")
      // alertText = 'Your submission has been received!';
      // success.value = true;
      // membershipForm.reset();
      

  },
      (error) => {
          // alertText = 'We were not able to process this submission at this time. Please try again.';
          // error.value = true;
          console.log('FAILED...', error.value);
      }
  );
}

}

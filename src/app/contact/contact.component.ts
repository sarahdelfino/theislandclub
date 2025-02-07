import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AlertComponent } from '../alert/alert.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FirebaseService } from '../firebase.service';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, AlertComponent, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  alertText = '';
  alertType = '';
  contactForm: FormGroup;
  err = false;
  success = false;
  errorText = '';

  constructor(public firebaseService: FirebaseService) {
    this.contactForm = new FormGroup({
      submitDate: new FormControl(Date.now(), [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [Validators.required]),
    })
  }

  submit(e: Event) {
    const message = this.contactForm.value;
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (this.contactForm.invalid) {
      this.errorText = 'Please ensure all necessary values are provided.';
    } else {
      this.errorText = '';
      this.firebaseService.addMessage(message).then(() => {
        emailjs.sendForm("service_lwdjtb9", "template_dk7f0b3", form, {
          publicKey: 'pp0s7qlmsjt-_40XH',
        }).catch((err) => {
          console.log("Unable to send message email: ", err);
          this.alertText = 'We were not able to process your submission at this time. Please try again.';
          this.err = true;
          this.alertType = 'err';
        });
        this.success = true;
        this.alertText = 'Your submission has been received!';
        this.alertType = 'success';
        form.reset();
        setTimeout(() => {
          this.success = false;
        }, 5000);
      }).catch((err: any) => {
        this.alertText = 'We were not able to process your submission at this time. Please try again.';
        this.err = true;
        this.alertType = 'err';
        console.log('FAILED...', err);
      });
    }
  }

}

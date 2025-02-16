import { Component, Input, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripeElementsOptions } from '@stripe/stripe-js';
import { injectStripe, StripeElementsDirective, StripePaymentElementComponent } from 'ngx-stripe';
import { AlertComponent } from "../alert/alert.component";
import emailjs from '@emailjs/browser';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, StripeElementsDirective, StripePaymentElementComponent, AlertComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  constructor(private firebaseService: FirebaseService) {
    
   }

  @ViewChild(StripePaymentElementComponent) paymentElement!: StripePaymentElementComponent;

  @Input() errorText: string;
  @Input() membershipForm: any;

  paying = signal(false);
  alertType = "";
  amount: number;

  protected elementsOptions: StripeElementsOptions = {
    locale: 'en',
    clientSecret: '',
    appearance: {
      theme: 'stripe',
      variables: {
        colorTextPlaceholder: '#4F7FAA',
        colorPrimary: '#4F7FAA',
      }
    }
  }

  stripe = injectStripe();

  async ngOnInit(): Promise<void> {
    this.membershipForm.get("membershipType").value === 'family' ? this.amount = 350 : this.amount = 250;
    await this.fetchIntent();
    this.membershipForm.get('membershipType').valueChanges.subscribe((newValue: any) => {
    newValue === 'family' ? this.amount = 350 : this.amount = 250;
      this.fetchIntent();
      this.paymentElement.fetchUpdates();
    })
  }

  async fetchIntent(): Promise<any> {
    console.log(this.membershipForm.get('membershipType').value)
    const options = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ membershipType: this.membershipForm.get('membershipType').value })
    }
    const response = await fetch(`https://create-payment-intent-939559041500.us-central1.run.app`, options);
    // const response = await fetch(`http://127.0.0.1:5001/theislandclub/us-east1/create_payment_intent`, options);
    const { client_secret: clientSecret } = await response.json();
    this.elementsOptions.clientSecret = clientSecret;
  }

  pay() {
    const form = this.membershipForm as HTMLFormElement;
    if (this.membershipForm.invalid) {
      this.errorText = 'Please ensure all necessary values are provided.';
      this.alertType = 'err';
      return
    } else {
      this.paying.set(true);
      this.errorText = 'Submitting payment...';
      this.alertType = 'info';
      this.stripe.confirmPayment({
        elements: this.paymentElement.elements,
        redirect: 'if_required'
      }).subscribe(result => {
        this.paying.set(false);
        if (result.error) {
          this.errorText = result.error.message || 'There was an error processing your request.';
          this.alertType = 'err'
        } else if (result.paymentIntent?.status === 'succeeded') {
          this.errorText = 'Successfully submitted payment! You will receive a confirmation email shortly.';
          this.alertType = 'success';
          this.firebaseService.addMember(this.membershipForm.value).then(() => {
            if (this.membershipForm.value.membershipType === 'family') {
              emailjs.sendForm("service_lwdjtb9", "template_de4aoh4", "#memberForm", {
                publicKey: 'pp0s7qlmsjt-_40XH',
              }).catch((err) => {
                console.log("Unable to send membership email: ", err);
                this.errorText = 'We were not able to process your submission at this time. Please try again.';
                this.alertType = 'err';
              });
            } else {
              // send individual email
              emailjs.sendForm("service_lwdjtb9", "template_hp8pthp", "#memberForm", {
                publicKey: 'pp0s7qlmsjt-_40XH',
              }).catch((err) => {
                console.log("Unable to send membership email: ", err);
                this.errorText = 'Your payment succeeded, but we were not able to process your membership email at this time. Please contact the club.';
                this.alertType = 'err';
              });
            }
            emailjs.sendForm("service_lwdjtb9", "template_fu1h6yo", "#memberForm", {
              publicKey: 'pp0s7qlmsjt-_40XH'
            });
          }).catch((err) => {
            this.errorText = 'Your payment succeeded, but we were not able to process your membership email at this time. Please contact the club.';
            this.alertType = 'err';
            console.log('FAILED...', err);
          });
        }
      })
    }
  }
}

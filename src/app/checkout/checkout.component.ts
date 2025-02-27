import { Component, Input, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripeElementsOptions } from '@stripe/stripe-js';
import { injectStripe, StripeElementsDirective, StripePaymentElementComponent } from 'ngx-stripe';
import { AlertComponent } from "../alert/alert.component";
import emailjs from '@emailjs/browser';
import { FirebaseService } from '../firebase.service';
import { StripeService } from '../stripe.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, StripeElementsDirective, StripePaymentElementComponent, AlertComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  constructor(private firebaseService: FirebaseService, private stripeService: StripeService) {
    
   }

  @ViewChild(StripePaymentElementComponent) paymentElement!: StripePaymentElementComponent;

  @Input() errorText: string;
  @Input() membershipForm: any;

  paying = signal(false);
  alertType = "";
  amount: number;
  intentId: string;

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
      this.stripeService.updatePaymentIntent({ "quantity": 1, "type": this.membershipForm.get('membershipType')?.value, "stripe": this.intentId })
      this.paymentElement.fetchUpdates();
    })
  }

  async fetchIntent(): Promise<any> {
    await this.stripeService.getStripeIntent({ type: this.membershipForm.get('membershipType').value }).then((val) => {
      this.elementsOptions.clientSecret = val.client_secret;
      this.intentId = val.intent
    })
  }

  pay() {
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

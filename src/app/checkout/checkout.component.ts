import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripeElementsOptions, StripePaymentElementOptions } from '@stripe/stripe-js';
import { injectStripe, StripeElementsDirective, StripePaymentElementComponent } from 'ngx-stripe';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, StripeElementsDirective, StripePaymentElementComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  elementsOptions: StripeElementsOptions = {
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
    await this.fetchIntent();
  }

  async fetchIntent(): Promise<any> {
    const response = await fetch('http://127.0.0.1:5001/theislandclub/us-east1/create_payment_intent');
    const {client_secret: clientSecret} = await response.json();
    this.elementsOptions.clientSecret = clientSecret;
  }

}

import { Component, Input, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripeElementsOptions } from '@stripe/stripe-js';
import { injectStripe, StripeElementsDirective, StripePaymentElementComponent } from 'ngx-stripe';
import { FormControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-stripe',
  standalone: true,
  imports: [CommonModule, StripeElementsDirective, ReactiveFormsModule, StripePaymentElementComponent],
  templateUrl: './stripe.component.html',
  styleUrl: './stripe.component.css'
})
export class StripeComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  @ViewChild(StripePaymentElementComponent) paymentElement!: StripePaymentElementComponent;

  paying = signal(false);
  total: number;
  tasteForm: FormGroup;
  errorText = '';
  quantity = signal(0);

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

  ngOnInit() {
    this.tasteForm = this.formBuilder.group({
      submitDate: new FormControl(Date.now(), [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      ticketType: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
    })
  }

  decrement() {
    if (this.quantity() != 0) {
      this.quantity.update(value => value - 1);
    }
  }

  increment() {
    this.quantity.update(value => value + 1);
  }


}

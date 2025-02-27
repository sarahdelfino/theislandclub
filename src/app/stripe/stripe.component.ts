import { Component, computed, Input, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripeElementsOptions } from '@stripe/stripe-js';
import { injectStripe, StripeElementsDirective, StripePaymentElementComponent } from 'ngx-stripe';
import { FormControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StripeService } from '../stripe.service';
import { AlertComponent } from "../alert/alert.component";

@Component({
  selector: 'app-stripe',
  standalone: true,
  imports: [CommonModule, StripeElementsDirective, ReactiveFormsModule, StripePaymentElementComponent, AlertComponent],
  templateUrl: './stripe.component.html',
  styleUrl: './stripe.component.css'
})
export class StripeComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private stripeService: StripeService) { }

  @ViewChild(StripePaymentElementComponent) paymentElement!: StripePaymentElementComponent;

  paying = signal(false);
  total: number = 80;
  tasteForm: FormGroup;
  errorText = '';
  alertText = '';
  alertType = '';
  quantity = signal(1);
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

  async ngOnInit() {
    this.tasteForm = this.formBuilder.group({
      submitDate: new FormControl(Date.now(), [Validators.required]),
      quantity: new FormControl('1', [Validators.required]),
      ticketType: new FormControl('non', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
    });

    this.tasteForm.get('ticketType')?.valueChanges.subscribe((val: string) => {
      this.calculateTotal();
    });

    await this.stripeService.getStripeIntent({ "type": this.tasteForm.get("ticketType")?.value}).then((val) => {
      this.elementsOptions.clientSecret = val.client_secret;
      this.intentId = val.intent
    });

  }

  decrement() {
    if (this.quantity() != 1) {
      this.quantity.update(value => value - 1);
      this.calculateTotal();
    }
  }

  increment() {
    this.quantity.update(value => value + 1);
    this.calculateTotal();
  }

  calculateTotal() {
    this.tasteForm.value.quantity = this.quantity();
    if (this.tasteForm.get('ticketType')?.value === "non") {
      this.total = this.quantity() * 80
    } else {
      this.total = this.quantity() * 60
    }
    this.stripeService.updatePaymentIntent({ "quantity": this.quantity(), "type": this.tasteForm.get('ticketType')?.value, "stripe": this.intentId });
  }

  pay() {
    if (this.tasteForm.invalid) {
      this.errorText = 'Please ensure all values are provided.';
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
        }
      })
    }

  }


}

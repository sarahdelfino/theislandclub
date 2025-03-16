import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  //for local testing
  private testEndpoint = 'http://127.0.0.1:5001/theislandclub/us-east1';

  constructor() { }

  async getStripeIntent(body: any): Promise<any> {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      method: 'POST',
      body: JSON.stringify(body)
    }
    const response = await fetch(`https://create-payment-intent-939559041500.us-central1.run.app`, options);
    // const response = await fetch(`${this.testEndpoint}/create_payment_intent`, options);
    const res = await response.json();
    return res;
  }

  async updatePaymentIntent(body: any): Promise<any> {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      method: 'POST',
      body: JSON.stringify(body)
    }
    const response = await fetch(`https://update-payment-intent-939559041500.us-central1.run.app`, options);
    // const response = await fetch(`http://127.0.0.1:5001/theislandclub/us-central1/update_payment_intent`, options);
    return response;
  }
  
  async createCheckoutSession(): Promise<any> {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      method: 'POST',
      // body: JSON.stringify(body)
    }
    // const response = await fetch(`https://create-payment-intent-939559041500.us-central1.run.app`, options);
    const response = await fetch(`http://127.0.0.1:5001/theislandclub/us-central1/create_checkout_session`, options);
    // const res = await response.json();
    return response;
  }
}

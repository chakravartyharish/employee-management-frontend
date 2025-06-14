import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
// Import environment but we'll use hardcoded URL for now
import { environment } from '../../environments/environment';

interface PaymentResponse {
  sessionId: string;
  sessionUrl: string;
  status: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  // Hardcode the Heroku URL to ensure it works regardless of environment
  private apiUrl = 'https://employee-management-backend-ha.herokuapp.com/api/payments';
  
  // Log the API URL being used
  constructor(private http: HttpClient) {
    console.log('PaymentService using API URL:', this.apiUrl);
  }

  // Constructor moved above

  createCheckoutSession(product: Product): Observable<PaymentResponse> {
    const paymentRequest = {
      productId: product.id,
      productName: product.name,
      amount: product.price,
      currency: 'usd',
      successUrl: window.location.origin + '/payment-success',
      cancelUrl: window.location.origin + '/payment-cancel'
    };

    return this.http.post<PaymentResponse>(`${this.apiUrl}/create-checkout-session`, paymentRequest);
  }
}

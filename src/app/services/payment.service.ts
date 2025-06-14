import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
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
  private apiUrl = `${environment.apiUrl}/api/payments`;

  constructor(private http: HttpClient) { }

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

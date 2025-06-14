import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  template: `
    <div class="container mt-5 text-center">
      <div class="card p-5 shadow">
        <div class="mb-4 text-success">
          <i class="fas fa-check-circle fa-4x"></i>
        </div>
        <h2 class="mb-3">Payment Successful!</h2>
        <p class="lead mb-4">Thank you for your purchase. Your order has been processed successfully.</p>
        <button class="btn btn-primary" (click)="goToProducts()">Continue Shopping</button>
      </div>
    </div>
  `,
  styles: []
})
export class PaymentSuccessComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToProducts(): void {
    this.router.navigate(['/products']);
  }
}

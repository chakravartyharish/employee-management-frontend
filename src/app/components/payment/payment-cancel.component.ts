import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-cancel',
  template: `
    <div class="container mt-5 text-center">
      <div class="card p-5 shadow">
        <div class="mb-4 text-warning">
          <i class="fas fa-exclamation-circle fa-4x"></i>
        </div>
        <h2 class="mb-3">Payment Cancelled</h2>
        <p class="lead mb-4">Your payment has been cancelled. You have not been charged.</p>
        <button class="btn btn-primary" (click)="goToProducts()">Return to Products</button>
      </div>
    </div>
  `,
  styles: []
})
export class PaymentCancelComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToProducts(): void {
    this.router.navigate(['/products']);
  }
}

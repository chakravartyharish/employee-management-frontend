import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mock-checkout',
  templateUrl: './mock-checkout.component.html',
  styles: []
})
export class MockCheckoutComponent implements OnInit {
  productName: string = 'Product';
  amount: number = 0;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Get product details from query parameters
    this.route.queryParams.subscribe(params => {
      this.productName = params['productName'] || 'Product';
      this.amount = parseFloat(params['amount']) || 0;
    });
  }

  processPayment(): void {
    this.loading = true;
    
    // Simulate payment processing delay
    setTimeout(() => {
      this.loading = false;
      // Redirect to success page
      this.router.navigate(['/payment-success']);
    }, 2000);
  }

  cancel(): void {
    this.router.navigate(['/payment-cancel']);
  }
}

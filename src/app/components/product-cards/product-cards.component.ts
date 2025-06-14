import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { PaymentService } from '../../services/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-cards',
  templateUrl: './product-cards.component.html',
  styleUrls: ['./product-cards.component.css']
})
export class ProductCardsComponent implements OnInit {
  products: Product[] = [];
  loadingProductId: string | null = null; // Track which product is being processed

  constructor(private paymentService: PaymentService, private router: Router) { }

  ngOnInit(): void {
    // Initialize with sample product data
    this.products = [
      {
        id: 'prod1',
        name: 'Shoes',
        price: 100.00,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        imageUrl: 'assets/images/shoes.jpg',
        rating: 4
      },
      {
        id: 'prod2',
        name: 'Earphone',
        price: 40.00,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        imageUrl: 'assets/images/earphone.jpg',
        rating: 3
      },
      {
        id: 'prod3',
        name: 'Watch',
        price: 70.84,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        imageUrl: 'assets/images/watch.jpg',
        rating: 4
      },
      {
        id: 'prod4',
        name: 'Mobile',
        price: 1000.84,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        imageUrl: 'assets/images/mobile.jpg',
        rating: 5
      }
    ];
  }

  // Helper method to generate an array for star ratings
  getStarsArray(rating: number): number[] {
    return Array(5).fill(0).map((_, index) => index < rating ? 1 : 0);
  }

  // Handle Buy Now button click
  buyNow(product: Product): void {
    // Show loading indicator
    this.loadingProductId = product.id;
    
    // Simulate a brief loading delay
    setTimeout(() => {
      this.loadingProductId = null; // Reset loading state
      
      // Redirect to our mock checkout page with product details as query parameters
      this.router.navigate(['/checkout'], { 
        queryParams: { 
          productName: product.name,
          amount: product.price
        }
      });
    }, 500); // Short delay for better UX
  }
}

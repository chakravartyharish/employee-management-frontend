import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employee Management System';

  constructor(public router: Router) {}

  private showAlert(message: string, type: string) {
    // You can implement a toast notification or use a simple alert
    // For now, using console.log and alert
    console.log(`${type.toUpperCase()}: ${message}`);
    
    if (type === 'danger') {
      alert(`Error: ${message}`);
    } else if (type === 'success') {
      alert(`Success: ${message}`);
    } else if (type === 'warning') {
      alert(`Warning: ${message}`);
    }
  }
}
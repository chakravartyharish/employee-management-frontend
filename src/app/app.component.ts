import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { debugBackendConnection } from './debug-connection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Employee Management System';

  constructor(public router: Router) {}
  
  ngOnInit() {
    console.log('App initialized with environment:', environment);
    // Debug backend connection
    debugBackendConnection();
  }

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
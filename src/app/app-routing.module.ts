import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCardsComponent } from './components/product-cards/product-cards.component';
import { DepartmentListComponent } from './components/department/department-list.component';
import { EmployeeListComponent } from './components/employee/employee-list.component';
import { PaymentSuccessComponent } from './components/payment/payment-success.component';
import { PaymentCancelComponent } from './components/payment/payment-cancel.component';
import { MockCheckoutComponent } from './components/payment/mock-checkout.component';

const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'departments', component: DepartmentListComponent },
  { path: 'products', component: ProductCardsComponent },
  { path: 'payment-success', component: PaymentSuccessComponent },
  { path: 'payment-cancel', component: PaymentCancelComponent },
  { path: 'checkout', component: MockCheckoutComponent },
  { path: '**', redirectTo: '/employees' } // Redirect to employees for any unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

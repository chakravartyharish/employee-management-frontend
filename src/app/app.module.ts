import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductCardsComponent } from './components/product-cards/product-cards.component';
import { DepartmentListComponent } from './components/department/department-list.component';
import { EmployeeListComponent } from './components/employee/employee-list.component';
import { PaymentSuccessComponent } from './components/payment/payment-success.component';
import { PaymentCancelComponent } from './components/payment/payment-cancel.component';
import { MockCheckoutComponent } from './components/payment/mock-checkout.component';

// NgRx imports
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './state';
import { EmployeeEffects } from './state/employees/effects/employee.effects';

@NgModule({
  declarations: [
    AppComponent,
    ProductCardsComponent,
    DepartmentListComponent,
    EmployeeListComponent,
    PaymentSuccessComponent,
    PaymentCancelComponent,
    MockCheckoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    // NgRx Store setup
    StoreModule.forRoot(reducers, { metaReducers }),
    // NgRx Effects setup
    EffectsModule.forRoot([EmployeeEffects]),
    // NgRx DevTools setup - only enabled for development
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: false, // Set to true in production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
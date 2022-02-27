import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialUIModule } from 'src/material.module';

import { SidebarComponent } from './sidebar/sidebar.component';
import { PizzaComponent } from './pizza/pizza.component';
import { SideComponent } from './side/side.component';
import { SideEnum } from './pizza/pizza.model';
import { PizzaAddonComponent } from './pizza-addon/pizza-addon.component';
import { HttpErrorInterceptor } from './common/HttpErrorInterceptor';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { CustomPizzaComponent } from './custom-pizza/custom-pizza.component';
import { ToppingsComponent } from './toppings/toppings.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    PizzaComponent,
    SideComponent,
    PizzaAddonComponent,
    CartDetailsComponent,
    OrderSummaryComponent,
    CustomPizzaComponent,
    ToppingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialUIModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide:'SidesResolver',
      useValue : () =>{ return SideEnum.Sides; }
    },
    {
      provide:'DessertResolver',
      useValue : () =>{ return SideEnum.Dessert; }
    },
    {
      provide:'BeverageResolver',
      useValue : () =>{ return SideEnum.Beverage; }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

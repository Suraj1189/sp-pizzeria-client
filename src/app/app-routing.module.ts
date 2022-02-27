import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomPizzaComponent } from './custom-pizza/custom-pizza.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { PizzaComponent } from './pizza/pizza.component';
import { SideComponent } from './side/side.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  {
    path: 'pizzaria', component: SidebarComponent,
    children: [
      { path: 'pizza', component: PizzaComponent },
      { path: 'side', component: SideComponent, resolve: { sideType: 'SidesResolver' } },
      { path: 'beverage', component: SideComponent, resolve: { sideType: 'BeverageResolver' } },
      { path: 'dessert', component: SideComponent, resolve: { sideType: 'DessertResolver' } },
      { path: 'custom', component: CustomPizzaComponent },
      { path: 'summary', component: OrderSummaryComponent },
    ]
  },
  { path: '', redirectTo: '/pizzaria', pathMatch: 'full' },
  { path: '**', component: SidebarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

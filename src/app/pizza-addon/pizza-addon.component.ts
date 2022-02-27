import { Component, OnInit } from '@angular/core';
import { PizzaBaseModel } from '../pizza/pizza.model';

@Component({
  selector: 'app-pizza-addon',
  templateUrl: './pizza-addon.component.html',
  styleUrls: ['./pizza-addon.component.css']
})
export class PizzaAddonComponent implements OnInit {

  public pizzaBaseList: Array<PizzaBaseModel> = [];
  public selectedBase : PizzaBaseModel = <PizzaBaseModel>{};
  constructor() { }

  ngOnInit(): void {
    this.pizzaBaseList = [
      { name: '8-inch Thin Crust', price: 295, isSelected: false },
      { name: '11-inch Thin Crust', price: 495, isSelected: false },
      { name: '8-inch Thik Crust', price: 345, isSelected: false },
      { name: '11-inch Thik Crust', price: 575, isSelected: false },
    ];
  }

}

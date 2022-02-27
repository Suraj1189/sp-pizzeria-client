import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../common/services/data.service';
import { IngredientDTO, PizzaBaseModel, PizzaDTO } from '../pizza/pizza.model';

@Component({
  selector: 'app-toppings',
  templateUrl: './toppings.component.html',
  styleUrls: ['./toppings.component.css']
})
export class ToppingsComponent implements OnInit {

  public pizzaBaseList: Array<PizzaBaseModel> = [];
  public selectedBase: PizzaBaseModel = <PizzaBaseModel>{};
  public toppings: Array<IngredientDTO> = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Array<PizzaDTO>,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData<Array<IngredientDTO>>('custompizza/toppings')
      .subscribe({
        next: (result: Array<IngredientDTO>) => {
          this.initializeView();
          this.toppings = result;
        }
      });
  }

  public filterFunction = (category: number): any[] => {
    return this.toppings.filter(i => i.categoryId === category);
  }

  private initializeView = (): void => {
    this.pizzaBaseList = [
      { name: '8-inch Thin Crust', price: 425, isSelected: false },
      { name: '11-inch Thin Crust', price: 595, isSelected: false },
      { name: '8-inch Thik Crust', price: 475, isSelected: false },
      { name: '11-inch Thik Crust', price: 665, isSelected: false },
    ];
  }

}

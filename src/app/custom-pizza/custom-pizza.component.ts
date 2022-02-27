import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { concatMap } from 'rxjs/operators';
import { CartService } from '../common/services/cart.service';
import { DataService } from '../common/services/data.service';
import { CartDTO, CreatePizzaModel, IngredientDTO, PizzaBaseModel, PizzaDTO } from '../pizza/pizza.model';
import { ToppingsComponent } from '../toppings/toppings.component';

@Component({
  selector: 'app-custom-pizza',
  templateUrl: './custom-pizza.component.html',
  styleUrls: ['./custom-pizza.component.css']
})
export class CustomPizzaComponent implements OnInit {

  public pizzaList: Array<PizzaDTO> = [];
  public vegPizzaImage: string = '../../assets/veg.png';
  public nonVegPizzaImage: string = '../../assets/non-veg.png';
  constructor(public dialog: MatDialog, private dataService: DataService, private cartService: CartService) { }

  ngOnInit(): void {
    this.getAllPizzas();
  }
  private getAllPizzas = (): void => {
    this.dataService.getData<Array<PizzaDTO>>('CustomPizza')
      .subscribe({
        next: (data: Array<PizzaDTO>) => {
          this.pizzaList = data;
          console.log(data);
        }
      });
  }
  public onAddClick = (pizza: PizzaDTO): void => {
    const dialofRef = this.dialog.open(ToppingsComponent, {
      data: pizza,
      width: '500px'
    });

    dialofRef.afterClosed().subscribe((data: { toppings: IngredientDTO[], pizzaBase: PizzaBaseModel }) => {
      if (data) {
        this.createAndPlaceOrder(Object.assign({}, pizza), data);
      }
    });
  }

  private createAndPlaceOrder = (pizza: PizzaDTO, data: { toppings: IngredientDTO[], pizzaBase: PizzaBaseModel }): void => {
    pizza.description = '';
    pizza.ingredientIds = [];
    if (data.pizzaBase) {
      pizza.description = `${pizza.description} + ${data.pizzaBase.name}`;
      pizza.price = data.pizzaBase.price + pizza.price;
    }
    let toppings = data.toppings.filter(x => x.isSelected);
    if (toppings && toppings.length) {
      let total = toppings.map(x => x.price).reduce((a, b) => a + b, 0);
      toppings.forEach((x) => {
        pizza.description = `${pizza.description} + ${x.name}`,
          pizza.ingredientIds.push(x.ingredientId);
      });
      pizza.price = total + pizza.price;
      pizza.isCustomize = true;
    }
    this.dataService.postData<PizzaDTO>('custompizza', pizza)
      .pipe(concatMap(result => this.dataService.postData<CartDTO>('pizzacart', <CartDTO>{ customerId: 1, pizzaId: result.pizzaId, price: pizza.price })))
      .subscribe({
        next: (cartDTO: CartDTO) => {
          this.cartService.addToCart(cartDTO);
        }
      });
  }
}

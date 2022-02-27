import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../common/services/cart.service';
import { DataService } from '../common/services/data.service';
import { PizzaAddonComponent } from '../pizza-addon/pizza-addon.component';
import { CartDTO, PizzaBaseModel, PizzaDTO } from './pizza.model';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})
export class PizzaComponent implements OnInit {

  public pizzaList: Array<PizzaDTO> = [];
  public filterList: Array<PizzaDTO> = [];
  public isVegOnly: boolean = false;
  public vegPizzaImage: string = '../../assets/veg.png';
  public nonVegPizzaImage: string = '../../assets/non-veg.png';

  constructor(private dataService: DataService, public dialog: MatDialog, private cartService: CartService) { }

  ngOnInit(): void {
    this.getAllPizzas();
  }


  private getAllPizzas = (): void => {
    this.dataService.getData<Array<PizzaDTO>>('Pizza')
      .subscribe({
        next: (data: Array<PizzaDTO>) => {
          this.pizzaList = data;
          //this.filterList = Object.assign([], data);
          this.filterList = data;
          console.log(data);
        }
      });
  }

  public onFilterClick = (showVegOnly: boolean): void => {
    if (showVegOnly) {
      this.filterList = this.pizzaList.filter(x => x.categoryId == 1);
    }
    else
      this.filterList = this.pizzaList;
    this.isVegOnly = !this.isVegOnly;
  }

  public onAddClick = (pizza: PizzaDTO): void => {
    const dialogRef = this.dialog.open(PizzaAddonComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      let updatePizza = Object.assign({}, pizza)
      this.cartService.updatePizzaCart(updatePizza, result);
    });
  }

}

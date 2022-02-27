import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../common/services/cart.service';
import { DataService } from '../common/services/data.service';
import { SideEnum } from '../pizza/pizza.model';
import { NonPizzaDTO } from './side.model';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {

  public sideList: Array<NonPizzaDTO> = [];
  public filterList: Array<NonPizzaDTO> = [];

  constructor(private dataService: DataService, private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.getAllSides()
  }

  public onAddClick = (side: NonPizzaDTO): void => {
    this.cartService.updateSideCart(side);
  }

  private getAllSides = (): void => {
    this.dataService.getData<Array<NonPizzaDTO>>('Sides', { sideEnum: this.route.snapshot.data['sideType'] })
      .subscribe({
        next: (data: Array<NonPizzaDTO>) => {
          this.sideList = data;
          this.filterList = data;
          console.log(data);
        }
      });
  }

}

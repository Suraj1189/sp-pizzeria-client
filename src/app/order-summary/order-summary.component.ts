import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../common/services/cart.service';
import { DataService } from '../common/services/data.service';
import { OrderDTO } from '../pizza/pizza.model';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  public order : OrderDTO =<OrderDTO>{};
  public ItemTotal :number=0;
  public deliveryCharges :number=54;
  public subtotal:number =0;
  public gst:number =0;
  constructor(private dataService: DataService,private router: Router,private cartService:CartService) { }

  ngOnInit(): void {
    this.getActiveOrder();
  }

  public onDoneClick = () :void=>{
    this.dataService.updateData<boolean>('order/done',this.order)
      .subscribe({
        next:(result:boolean)=>{
          if(result){
            this.cartService.removeAll();
            this.router.navigate(['/pizzaria/pizza']);
          }
        }
      });
  }

  private getActiveOrder = () :void=>{
    this.dataService.getData<OrderDTO>('order',{customerId : 1})
      .subscribe({
        next :(result:OrderDTO) =>{
          this.order = result;
          this.ItemTotal = this.order.cartList.map(x=>x.price).reduce((a,b)=>a+b,0);
          this.subtotal = this.ItemTotal + this.deliveryCharges;
          this.gst = (this.subtotal * 5) /100;
        }
      });
  }

}

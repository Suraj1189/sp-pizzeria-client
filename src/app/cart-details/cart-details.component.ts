import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartService } from '../common/services/cart.service';
import { CartDTO, CartModalCallBack, OrderDTO } from '../pizza/pizza.model';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  public cartModalCallBack :CartModalCallBack = new CartModalCallBack();

  public ItemTotal :number=0;
  public deliveryCharges :number=54;
  public subtotal:number =0;
  public gst:number =0;
  public finalAmount:number=0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Array<CartDTO>, private cartService: CartService) {
    this.data.forEach(x => x.actualPrice = x.price);
    this.updateCartValue();
  }

  ngOnInit(): void {
  
  }

  public onDeleteClick = (cart: CartDTO): void => {
    let index: number = this.data.findIndex(x => x.cartId = cart.cartId);
    this.cartService.deleteFromCart(cart).subscribe({
      next: (result: boolean) => {
        if (result){
          this.data.splice(index, 1);
          this.updateCartValue();
        }
      }
    });
  }

  public onPlusClick = (cart: CartDTO): void => {
    cart.price = cart.price + cart.actualPrice;
    cart.quantity++;
    this.cartService.updateCartDetails(cart);
    this.updateCartValue();
  }

  public onMinusClick = (cart: CartDTO): void => {
    if (cart.quantity != 1) {
      cart.price = cart.price - cart.actualPrice;
      cart.quantity--;
      this.cartService.updateCartDetails(cart);
      this.updateCartValue();
    }
  }

  private updateCartValue =():void=>{
    this.ItemTotal = this.data.map(x=>x.price).reduce((a,b)=>a+b,0);
    this.subtotal = this.ItemTotal + this.deliveryCharges;
    this.gst = (this.subtotal * 5) /100;
    this.finalAmount = this.subtotal+ this.gst;

    this.cartModalCallBack.cartList = this.data;
    this.cartModalCallBack.cartTotal = this.finalAmount;
  }

}

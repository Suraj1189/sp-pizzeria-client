import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, shareReplay, Subject } from 'rxjs';
import { CartDTO, PizzaBaseModel, PizzaDTO } from 'src/app/pizza/pizza.model';
import { NonPizzaDTO } from 'src/app/side/side.model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartList: Array<CartDTO> = [];

  private cartUpdateSource = new Subject<Array<CartDTO>>();

  public cartUpdate$ = this.cartUpdateSource.asObservable();

  constructor(private dataService: DataService) { }

  public addToCart = (cart: CartDTO): void => {
    if (cart) {
      if (this.cartList) {
        let index = this.cartList.findIndex(x => x.cartId == cart.cartId);
        if (index > -1)
          this.cartList[index] = cart;
        else
          this.cartList.push(cart);
      }
      this.cartUpdateSource.next(this.cartList);
    }
  }

  public removeAll = (): void => {
    this.cartList = [];
    this.cartUpdateSource.next(this.cartList);
  }

  private removeFromCart = (cart: CartDTO): void => {
    if (cart) {
      if (this.cartList) {
        let index = this.cartList.findIndex(x => x.cartId == cart.cartId);
        if (index > -1)
          this.cartList.splice(index, 1);
      }
      this.cartUpdateSource.next(this.cartList);
    }
  }

  public getAllTheCartForCustomer = (customerId: number): Observable<Array<CartDTO>> => {
    return this.dataService.getData<Array<CartDTO>>('PizzaCart/Fetch', { customerId: customerId });
  }

  public updatePizzaCart = (pizza: PizzaDTO, pizzaBaseModel: PizzaBaseModel): void => {
    if (pizza) {
      let cart = new CartDTO();
      cart.quantity = 1;
      cart.customerId = 1;
      cart.pizzaId = pizza.pizzaId;
      cart.price = pizzaBaseModel && pizzaBaseModel.price > 0 ? pizzaBaseModel.price : pizza.price;
      this.updateCartDetails(cart);
    }
  }

  public updateSideCart = (nonPizzaDTO?: NonPizzaDTO): void => {
    if (nonPizzaDTO) {
      let cart = new CartDTO();
    cart.quantity = 1;
    cart.customerId = 1;
      cart.nonPizzaId = nonPizzaDTO.nonPizzaId;
      cart.price = nonPizzaDTO.price;
    this.updateCartDetails(cart);
    }
  }

  public updateCartDetails = (cart: CartDTO): void => {
    this.dataService.postData<CartDTO>('PizzaCart', cart)
      .subscribe({
        next: (result: CartDTO) => {
          this.addToCart(result);
        }
      });
  }

  public deleteFromCart = (cart: CartDTO): Observable<boolean> => {
    let observable = this.dataService.deleteData<boolean>('PizzaCart', { cartId: cart.cartId }).pipe(shareReplay());
    observable.subscribe({
      next: (result: boolean) => {
        if (result)
          this.removeFromCart(cart);
      }
    });
    return observable;
  }
}

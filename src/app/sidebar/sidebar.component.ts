import { Component, OnInit } from '@angular/core';
import { MatDialog, DialogPosition } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartDetailsComponent } from '../cart-details/cart-details.component';
import { CartService } from '../common/services/cart.service';
import { DataService } from '../common/services/data.service';
import { CartDTO, CartModalCallBack, OrderDTO } from '../pizza/pizza.model';
import { SideNavMenu } from './sidebar.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public sideNaveList: SideNavMenu[] = [];
  public cartCount?: number = undefined;



  constructor(private cartService: CartService,
    public dialog: MatDialog,
    private dataService: DataService,
    private router: Router) {

    this.subscribeCartNotification();
  }

  ngOnInit(): void {

    this.sideNaveList = [
      { id: 'pizza', displayName: 'Pizzas', redirectUrl: '/pizzaria/pizza' },
      { id: 'side', displayName: 'Sides', redirectUrl: '/pizzaria/side' },
      { id: 'beverage', displayName: 'Beverages', redirectUrl: '/pizzaria/beverage' },
      { id: 'dessert', displayName: 'Desserts', redirectUrl: '/pizzaria/dessert' },
      { id: 'Custom', displayName: 'Make Your Own', redirectUrl: '/pizzaria/custom' },

    ]
  }

  public onCartClick = (): void => {
    this.cartService.getAllTheCartForCustomer(1)
      .subscribe({
        next: (data) => { this.openCart(data); }
      });
  }

  private subscribeCartNotification = (): void => {
    this.cartService.cartUpdate$.subscribe(
      (cartDTO: CartDTO[]) => {
        this.cartCount = cartDTO ? cartDTO.length : 0;
      }
    )
  }

  private openCart = (data: Array<CartDTO>): void => {
    let modal = this.dialog.open(CartDetailsComponent, {
      data: data,
      height: '100%',
      width: '500px',
      position: <DialogPosition>{ right: '0' }
    });

    modal.afterClosed().subscribe((result: CartModalCallBack) => {
      this.saveOrder(result);
    });
  }

  private saveOrder = (result: CartModalCallBack): void => {
    if (result && result.cartTotal > 0) {
      let orderDTO: OrderDTO = new OrderDTO();
      orderDTO.cartList = result.cartList;
      orderDTO.customerId = 1;
      orderDTO.deliveryDateTime = new Date();
      orderDTO.totalAmount = Math.round(result.cartTotal);
      orderDTO.placeDateTime = new Date();
      orderDTO.orderId = 0;

      this.dataService.postData<OrderDTO>('order', orderDTO)
        .subscribe({
          next: (orderDTO: OrderDTO) => {
            if (orderDTO)
              this.router.navigate(['/pizzaria/summary']);
          }
        });
    }
  }
}

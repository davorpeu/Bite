import { Component, OnInit } from '@angular/core';
import { MenuDish } from 'src/app/interfaces/mobile/restaurant';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  orders: MenuDish[];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    // sort od manjeg do većeg dana od 0 do 4
    this.cartService.orders.subscribe(orders => this.orders = orders.sort((a,b) => a.day - b.day));
  }

  async finishOrder(){
    await this.cartService.finishOrder();
  }
}

import { Component, OnInit } from '@angular/core';
import { MenuDish } from 'src/app/interfaces/mobile/restaurant';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  orders: MenuDish[];
  constructor(private cartService: CartService) { }

  ngOnInit() {
    
    this.cartNumber()
  }

  cartNumber(){
    this.orders = this.cartService.orders.getValue();
  }
}

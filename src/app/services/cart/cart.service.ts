import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MenuDish } from 'src/app/interfaces/mobile/restaurant';
import { Order } from 'src/app/interfaces/order';
import { StorageService } from '../storage/storage.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  orders: BehaviorSubject<MenuDish[]> = new BehaviorSubject([])

  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food"

  constructor(private storageService: StorageService, private userService: UserService, private httpClient: HttpClient, private router: Router) { }



  toggleDishInCart(dishInMenu: MenuDish): boolean {
    const x: MenuDish = Object.assign({}, dishInMenu);
    const orders = this.orders.getValue();
    const index = orders.findIndex(o => o.dishId === dishInMenu.dishId && dishInMenu.day === o.day)
    if (index === -1) {
      delete x.inCart;
      orders.push(x);
    }
    else {
      orders.splice(index, 1);
    }
    this.orders.next(orders);
    this.storageService.setData(this.userService._user.getValue().userId + 'cart', orders)
    return true;

  }

  finishOrder() {
    const order = this.orders.getValue()[0];

    let body = {
      "db": "Food",
      "queries": [
        {
          "query": "spOrder",
          "params": {
            "userid": this.userService._user.getValue().userId,
            "dishid": order.dishId,
            "day": order.day
          }
        }
      ]
    }
    this.httpClient.post(this.url, body).toPromise();
    this.orders.next([]);
    this.storageService.removeData(this.userService._user.getValue().userId+'cart');
  }
}

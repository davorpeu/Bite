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
      return true;
    }
    else {
      orders.splice(index, 1);
    }
    this.orders.next(orders);
    this.storageService.setData(this.userService.currentUser.getValue().userId + 'cart', orders)
    return false;

  }

  finishOrder() {
    const orders = this.orders.getValue()

    let body = {
      "db": "Food",
      "queries": [
       
      ]
    }

    // let query =  {
    //   "query": "spOrder",
    //   "params": {
    //     "userid": this.userService._user.getValue().userId,
    //     "dishid": 0,
    //     "day": 0
    //   }
    // }

    // this.orders.getValue.forEach(order => { apiCalls.push(this.apiService.callApi('url'))})
    //{}
    // ).toPromise
    // await Promise.all(apiCalls);
    //.this.orders.next([]);
    //ovako treba izgledati promise

    body.queries = orders.map((o) => {
      let query =  {
        "query": "spOrder",
        "params": {
          "userid": this.userService.currentUser.getValue().userId,
          "dishid": 0,
          "day": 0
        }
      }
      query.params.dishid = o.dishId;
      query.params.day = o.day;
      return query
    })

    this.httpClient.post(this.url, body).toPromise();
    this.orders.next([]);
    this.storageService.removeData(this.userService.currentUser.getValue().userId+'cart');
  }
}

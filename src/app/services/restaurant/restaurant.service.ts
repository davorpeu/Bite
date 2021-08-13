import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { BehaviorSubject } from 'rxjs';
import { Order } from 'src/app/interfaces/order';
import { Router } from '@angular/router';
import { Dish } from 'src/app/interfaces/dish';
import { Menu } from 'src/app/interfaces/menu';




@Injectable({
  providedIn: 'root'
})
export class RestaurantService {


  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food"

  constructor(private httpClient: HttpClient, private userService: UserService, private router: Router) { }


  _orders: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>(null);
  _menus: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>(null);
  _dishes: BehaviorSubject<Dish[]> = new BehaviorSubject<Dish[]>(null);

  initRestorauntForCompanyUser() {

    let body =
    {
      "db": "Food",
      "queries": [
        {
          "query": "spOrdersQuery",
          "params": {
            "action": "forCompany",
            "restoranid": this.userService.getUserCompany()
          },
          "tablename": "allOrders"
        },
        {
          "query": "spDishMenu",
          "params": {
            "action": "dish",
            "companyid": this.userService.getUserCompany()
          },
          "tablename": "allDishes"
        },
        {
          "query": "spMenu",
          "params": {
            "action": "week",
            "companyid": this.userService.getUserCompany()
          },
          "tablename": "allMenus"
        }
      ]
    }


    return this.httpClient.post(this.url, body).toPromise().then((res: {
      allOrders: Array<Order>,
      allDishes: Array<Dish>,
      allMenus: Array<Menu>
    }) => {
      this._orders.next(res.allOrders)
      this._menus.next(res.allMenus)
      this._dishes.next(res.allDishes)

    })

  }
  initRestorauntForCostumerUser() {
    return true;
  }

  logiran: boolean;

  addNewDish(dishName: string, soupStatus: number, saladStatus: number, breadStatus: number, description: string) {

    let dishBody = {
      "db": "Food",
      "queries": [
        {
          "query": "spDishAzur",
          "params": {
            "action": "insert",
            "companyid": this.userService.getUserCompany(),
            "name": dishName,
            "soup": soupStatus,
            "salad": saladStatus,
            "bread": breadStatus,
            "userid": this.userService.getUserId(),
            "description": description
          }
        }
      ]
    }


    this.httpClient.post(this.url, dishBody).subscribe((res: Array<Order>) => {
      if (res.length > 0) {

        this._orders.next(res);
      }
      this.router.navigate(['/web/menu']), { replaceUrl: true }
    });


  }





}

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

  

  onDishFromMenuClicked(clickedDish: Dish) {
    
   
  }

  onDishClicked(clickedDish: any) {
    throw new Error('Method not implemented.');
  }


  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food"

  constructor(private httpClient: HttpClient, private userService: UserService, private router: Router) { }


  _orders: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>(null);
  menus: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>(null);
  dishes: BehaviorSubject<Dish[]> = new BehaviorSubject<Dish[]>(null);

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
      this.menus.next(res.allMenus)
      this.dishes.next(res.allDishes)

    })

  }
  initRestorauntForCostumerUser() {
    return true;
  }

  logiran: boolean;

  addNewDish(dishName: string, soupStatus: number, saladStatus: number, breadStatus: number, dishDescription: string) {

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
            "description": dishDescription
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

  insertDishInMenu(day: number, dishId: number) {
    
    let body = {
      "db": "Food",
      "queries": [
        {
          "query": "spMenuAzur",
          "params": {
            "action": "insert",
            "dishid": dishId,
            "day": day +1,
            "userid": this.userService._user.value.userId
          }
        }
      ]
    }
    this.httpClient.post(this.url, body)
      .subscribe((response: any) => {
        console.log(`Inserted dish into menu -> ${response}`)
      })
  }

  removeDishFromMenu(day: number, dishId: number) {
    
    let body = {
      "db": "Food",
      "queries": [
          {
              "query": "spMenuAzur",
              "params": {
                  "action": "delete",
                  "dishid": dishId,
                  "day": day+ 1,
                  "userid": this.userService._user.value.userId
              }
          }
      ]
  }
    this.httpClient.post(this.url, body)
      .subscribe((response: any) => {
        console.log(`Deleted dish from menu -> ${response}`)
      })
  }


}

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
  removeFromMenu(clickedDish: Dish) {
    throw new Error('Method not implemented.');
  }


  




  constructor(private httpClient: HttpClient, private userService: UserService, private router: Router) { }


 


  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food"


  _orders: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>(null);
  menus: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>(null);
  dishes: BehaviorSubject<Dish[]> = new BehaviorSubject<Dish[]>(null);


  
  public filteredFetchedMenus: Map<number, BehaviorSubject<Array<Dish>>> = new Map([
    [0, new BehaviorSubject([])],
    [1, new BehaviorSubject([])],
    [2, new BehaviorSubject([])],
    [3, new BehaviorSubject([])],
    [4, new BehaviorSubject([])],
  ])
  public fetchedDishes: Map<number, BehaviorSubject<Array<Dish>>> = new Map([
    [0, new BehaviorSubject([])],
    [1, new BehaviorSubject([])],
    [2, new BehaviorSubject([])],
    [3, new BehaviorSubject([])],
    [4, new BehaviorSubject([])],
  ])
 
  currentDay = 0;

 


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


   addToMenu(clickedDish: Dish) {
     let newList = []
     let dishesInMenu = this.filteredFetchedMenus.get(this.currentDay).value
     this.fetchedDishes.get(this.currentDay).value.forEach((dish) => {
       if (dish.DishId == clickedDish.DishId) {
         dishesInMenu.push(dish)
         this.insertDishInMenu(this.currentDay, dish.DishId)
       }
       else
         newList.push(dish)

    })
     this.filteredFetchedMenus.get(this.currentDay).next(dishesInMenu)
     this.fetchedDishes.get(this.currentDay).next(newList)
   }

  // removeFromMenu(clickedDish: Dish) {
  //   let newList = []
  //   let dishesNotInMenu = this.dayDishesNotInMenu.get(this.currentDay).value
  //   this.dayDishesInMenu.get(this.currentDay).value.forEach((dish) => {
  //     if (dish.DishId == clickedDish.DishId && dish.Name == dish.Name && dish.Description == dish.Description) {
  //       dishesNotInMenu.push(dish)
  //       this.deleteDishFromMenu(this.currentDay, dish.DishId)
  //     }
  //     else
  //       newList.push(dish)

  //   })
  //   this.dayDishesNotInMenu.get(this.currentDay).next(dishesNotInMenu)
  //   this.dayDishesInMenu.get(this.currentDay).next(newList)

  // }


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
            "day": day + 1,
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
            "day": day + 1,
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


  onDayChanged(day : number){
    this.currentDay = day
  }

}









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
  




  




  constructor(private httpClient: HttpClient, private userService: UserService, private router: Router) { }


 


  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food"


  _orders: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>(null);
  menus: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>(null);
  dishes: BehaviorSubject<Dish[]> = new BehaviorSubject<Dish[]>(null);

 
  
  
 
  currentDay = 1;

 


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
      
     
     
         this.insertDishInMenu(this.currentDay, clickedDish.DishId)
   }


   removeFromMenu(clickedM: Menu) {
console.error("Method Not Implemeted my dude");


   // this.removeDishFromMenu(this.currentDay, clickedMenu.)

   }
    
  
 
  


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

  insertDishInMenu(Currentday: number, dishId: number) {

    let body = {
      "db": "Food",
      "queries": [
        {
          "query": "spMenuAzur",
          "params": {
            "action": "insert",
            "dishid": dishId,
            "day": Currentday,
            "userid": this.userService._user.value.userId
          }
        }
      ]
    }
    this.httpClient.post(this.url, body)
      .subscribe((response: any) => {
        console.log(`${response}`)
        this.initRestorauntForCompanyUser()
      })
  }

  removeDishFromMenu(day: number, dishid: number) {

    let body = {
      "db": "Food",
      "queries": [
        {
          "query": "spMenuAzur",
          "params": {
            "action": "delete",
            "dishid": dishid,
            "day": day,
            "userid": this.userService._user.value.userId
          }
        }
      ]
    }
    this.httpClient.post(this.url, body)
      .subscribe((response: any) => {
        console.log(`${response}`)
      })
  }


  onDayChanged(day : number){
    this.currentDay = day
    this.initRestorauntForCompanyUser()
  }

}









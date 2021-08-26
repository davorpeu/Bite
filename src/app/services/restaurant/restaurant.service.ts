import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { BehaviorSubject } from 'rxjs';
import { Order } from 'src/app/interfaces/order';
import { Router } from '@angular/router';
import { Dish } from 'src/app/interfaces/dish';
import { Menu } from 'src/app/interfaces/menu';
import { map } from 'rxjs/operators';
import { MenuDish, Restaurant } from 'src/app/interfaces/mobile/restaurant';







@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  

  onSelectDish(orders: MenuDish) {
  }

  selectedRestaurant?: Restaurant;

  onSelectRestaurant(restaurant: Restaurant): void {
    this.selectedRestaurant = restaurant;
    console.log(this.selectedRestaurant);
  }

  constructor(private httpClient: HttpClient, private userService: UserService, private router: Router) { }

  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food"
  _orders: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>(null);

  menus: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>(null);

  dishes: BehaviorSubject<Dish[]> = new BehaviorSubject<Dish[]>(null);

  allRestaurants: BehaviorSubject<Restaurant[]> = new BehaviorSubject<Restaurant[]>([]);

  allUserOrders: BehaviorSubject<Order[]> = new BehaviorSubject(null)

  currentDay = 1;

  logiran: boolean;

  //imageStorage = firebase.default.storage().ref('dishImage/')

  
  initRestaurantForCompanyUser() {

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

  initRestaurantForCostumerUser() {

    let body = {
      "db": "Food",
      "queries": [
        {
          "query": "spCompany",
          "params": {
            "action": "all"
          },
          tablename: 'allRestaurants'
        },
        {
          "query": "spMenu",
          "params": {
            "action": "all"
          },
          tablename: 'allMenus'
        },
        {
          "query": "spOrdersQuery",
          "params": {
            "action": "forUser",
            "userid": this.userService.currentUser.getValue().userId
          },
          tablename: 'allUserOrders'
        },
      ]
    }
    return this.httpClient.post(this.url, body).pipe(map((val: {
      allRestaurants: Restaurant[];
      allMenus: MenuDish[];
      allUserOrders: Order[];
    }) => {
      // console.log(val.allRestaurants);

      if (val.allRestaurants.length > 0) {
        const x = val.allRestaurants.map(r => ({
          companyId: r.companyId,
          name: r.name,
          menus: [1, 2, 3, 4, 5].map(d => val.allMenus.filter(m => m.companyId === r.companyId && m.day === d))
        }));
        console.log(x)

        // ovo hvata page kada želi dobiti podatke o svim restoranima
        this.allRestaurants.next(x);

      }
      this.allUserOrders.next(val.allUserOrders);
    }))

  }

  addToMenu(clickedDish: Dish) {



    this.insertDishInMenu(this.currentDay, clickedDish.DishId)
  }

  removeFromMenu(clickedMenu: Menu) {


    let dishId = this.dishes.getValue().find(val =>
      val.Name == clickedMenu.name
    ).DishId
    this.removeDishFromMenu(this.currentDay, dishId)

  }

  // addNewDishImage(dishImage: File) {
  //   // this.imageData.append('image', dishImage, dishImage.name);
  //   this.httpClient.post('http://bitedavorpeu.appspot.com/dishImage', dishImage,).subscribe(res => {
  //     console.log(res)

  //   })
  // }
  

  

  addNewDish(dishName: string, soupStatus: number, saladStatus: number, breadStatus: number, dishDescription: string,) {

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
            "userid": this.userService.currentUser.value.userId
          }
        }
      ]
    }
    this.httpClient.post(this.url, body)
      .subscribe((response: any) => {
        console.log(`${response}`)
        this.initRestaurantForCompanyUser()
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
            "userid": this.userService.currentUser.value.userId
          }
        }
      ]
    }
    this.httpClient.post(this.url, body)
      .subscribe((response: any) => {
        console.log(`${response}`)
        this.initRestaurantForCompanyUser()
      })
  }


  onDayChanged(day: number) {
    this.currentDay = day

  }

  getWeekMenuForSelectedRestaurant() {
    let body = {
      "db": "Food",
      "queries": [
        {
          "query": "spMenu",
          "params": {
            "action": "week",
            "companyid": this.selectedRestaurant?.companyId
          }
        }
      ]
    }
    this.httpClient.post(this.url, body)
      .subscribe((response: any) => {
        // console.log(`${response}`)
        console.log(response);

      })
  }

}









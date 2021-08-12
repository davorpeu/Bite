import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { BehaviorSubject } from 'rxjs';
import { Order } from 'src/app/interfaces/order';




@Injectable({
  providedIn: 'root'
})
export class RestaurantService {


  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food"

  constructor(private httpClient: HttpClient, private userService: UserService) { }


  _orders: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>(null);

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
          }
        }
      ]
    }


    return this.httpClient.post(this.url, body).toPromise().then((res: Array<Order>) => {
      this._orders.next(res)
      // return true;
    })

  }
  initRestorauntForCostumerUser() {
    return true;
  }

  logiran: boolean;

  addNewMeal(mealname: string, soupStatus: number, saladStatus: number, breadStatus: number, userId: number) {

    let body = {
      "db": "Food",
      "queries": [
        {
          "query": "spDishAzur",
          "params": {
            "action": "insert",
            "companyid": "9",
            "name": mealname,
            "soup": soupStatus,
            "salad": saladStatus,
            "bread": breadStatus,
            "userid": this.userService._user.getValue().userId
          }
        }
      ]
    }


    this.httpClient.post(this.url, body).subscribe


  }





}

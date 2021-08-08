import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserService } from '../user/user.service';
import { IonSelect } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

logiran: boolean;



  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food"

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  registerRestoraunt(companyName: string, status: boolean, userId: string) {

    let body = {
      "db": "Food",
      "queries": [
          {
              "query": "spCompanyAzur",
              "params": {
                  "action": "insert",
                  "name": companyName,
                  "status": status,
                  "userid": userId
              }
          }
      ]
  }
    this.httpClient.post(this.url, body).subscribe((res: Array<User>) => {
      if (res.length > 0){
  this.logiran = true;
  console.log(this.logiran)

      }
    });

  }
}

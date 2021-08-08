import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user/user.service';
import { IonSelect } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

logiran: boolean;



  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food"

  constructor(private httpClient: HttpClient) { }

  registerRestoraunt(email: string, username: string, password: string) {

    let body = {
      "db": "Food",
      "queries": [
          {
              "query": "spUsersAzur",
              "params": {
                  "action": "usertocompany",
                  "companyid": "1",
                  "userid": "10"
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

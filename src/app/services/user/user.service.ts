import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class UserService {





  _user: BehaviorSubject<User> = new BehaviorSubject<User>(null);


  constructor(private httpClient: HttpClient, private router: Router) { }


  user: User = null;


  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food"



  login(username: string, password: string) {
    let body = {
      "db": "Food",
      "queries": [
        {
          "query": "spUsersAzur",
          "params": {
            "action": "login",
            "email": username,
            "password": password
          }
        }
      ]
    }
    this.httpClient.post(this.url, body).subscribe((res: Array<User>) => {
      if (res.length > 0) {

        this._user.next(res[0]);
      }
      this.router.navigate(['/web/new-dish']), { replaceUrl: true }
    });

  }

  register(username: string, email: string, password: string, newRestaurant: boolean, newRestaurantName: string, status: number) {

    let body = {
      "db": "Food",
      "queries": [
        {
          "query": "spUsersAzur",
          "params": {
            "action": "insert",
            "name": username,
            "email": email,
            "password": password
          }
        }
      ]
    }

    this.httpClient.post(this.url, body).subscribe((res: Array<{
      userid: number
    }>) => {
      if (res.length > 0) {

        console.log(username)
        if (newRestaurant) {
          let bodyForNewRestaurant = {
            "db": "Food",
            "queries": [
              {
                "query": "spCompanyAzur",
                "params": {
                  "action": "insert",
                  "name": newRestaurantName,
                  "status": status,
                  "userid": res[0].userid
                }
              }
            ]
          }
          this.httpClient.post(this.url, bodyForNewRestaurant).subscribe(res => {
            console.log(res);
          })
        }

      }
    });

  }




  logout() {

    this._user.next(null);
  }

  getUserId(){
    return this._user.getValue().userId;
  }

  getUserCompany() {
    return this._user.getValue().companyId;
  }

}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from '../storage/storage.service';



@Injectable({
  providedIn: 'root'
})

export class UserService {




  _user: BehaviorSubject<User> = new BehaviorSubject<User>(null);


  constructor(private httpClient: HttpClient, private router: Router, private storageService: StorageService) { }


  user: User = null;

  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food"

  isMobile: boolean;


  



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
        this.storageService.setData("user",res[0]);

      }

      //change for testing
      this.router.navigate(['/'+ (!this.isMobile ? 'web' : 'mobile/tabs')+'/dashboard']), { replaceUrl: true }
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
            
          })
        }

      }
    });

  }




 async  logout() {

    this._user.next(null);
   await this.storageService.removeData("user");
  }

  getUserId(){
    return this._user.getValue().userId;
  }

  getUserCompany() {
    return this._user.getValue().companyId;
  }

}


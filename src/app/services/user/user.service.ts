import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface User {
  name: string;
  companyId: number;
  isAdmin: number;
  companyName: string;
  userId: number;

}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private httpClient: HttpClient) { }

  logiran: boolean = false;



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
        this.logiran = true;
        console.log(this.logiran)

      }
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
        this.logiran = true;
        console.log(this.logiran)
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


  registerAdmin(email: string, username: string, password: string) {

    let body = {
      "db": "Food",
      "queries": {
        "db": "Food",
        "queries": [
          {
            "query": "spUsersAzur",
            "params": {
              "action": "usertoadmins",
              "userid": "10"
            }
          }
        ]
      }
    }
    this.httpClient.post(this.url, body).subscribe((res: Array<User>) => {
      if (res.length > 0) {
        this.logiran = true;
        console.log(this.logiran)

      }
    });

  }

}


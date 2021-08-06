import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
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
      if (res.length > 0){
  this.logiran = true;
  console.log(this.logiran)

      }
    });

  }

 

}

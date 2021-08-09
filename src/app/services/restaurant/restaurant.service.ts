import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';




@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

logiran: boolean;



  url: string = "https://jupitermobiletest.jupiter-software.com:30081/jupitermobilex/gen/api/food"

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  
}

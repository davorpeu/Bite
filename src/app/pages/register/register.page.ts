import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonSelect } from '@ionic/angular';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private userService: UserService, private router: Router, private restaurantService: RestaurantService) { }

  ngOnInit() {
  }




  registerRestaurant: boolean = false;
  showOnRestaurantClicked() {
    this.registerRestaurant = !this.registerRestaurant;
  }

  username: any
  email: any
  password: any
  companyName: any
  result: boolean = false
  status = this.result ? 1 : 0
  userId: any
  




  register() {
    this.userService.register(this.username, this.email, this.password, this.registerRestaurant, this.companyName, this.status)
    
  }
  // registerUser() {
  //   this.userService.register(this.username, this.email, this.password)
  // }



  private changeRoute(event: IonSelect) {

    this.router.navigate(['/login']);

  }

 

  statusClicked() {


  
    this.result = !this.result;
    this.status = this.result ? 1 : 0

   

  }




}

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

  constructor(private userService: UserService, private router: Router, private restorauntService: RestaurantService) { }

  ngOnInit() {
  }



  somethingClicked: boolean = true;
  hideOnSomethingClicked() {
    this.somethingClicked= !this.somethingClicked;
    }

  username: any
  email: any
  password: any

  register() {
    this.userService.register(this.username, this.email, this.password)
  }

  private changeRoute(event: IonSelect) {

    this.router.navigate(['/login']);

  }

  

}

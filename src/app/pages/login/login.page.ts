import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonRadio, IonSelect } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';
import { RegisterPage } from '../register/register.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

    

  }

  

  email: any
  password: any

login(){
this.userService.login(this.email, this.password)
}


private changeRoute(event:IonSelect){
  
  this.router.navigate(['/register']);

}
  
}

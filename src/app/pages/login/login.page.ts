import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonRadio, IonSelect } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/user/user.service';
import { RegisterPage } from '../register/register.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private userService: UserService, private router: Router, ) { }

  ngOnInit() {
//  enable for testing
      //if(this.email   == "davorpeu1@gmail.com")
    //  this.login()

      

  }
//test za logout
  // ionViewWillEnter() {
  //   console.log('sdf');
    
  // }

  
//ovo je login korisnika 
  // email: any = "davorpeu1@gmail.com"
  // password: any ="123"

  email: any = "vedran.prpic1@gmail.com"
  password: any ="lozinka"

login(){
this.userService.login(this.email, this.password)

}


private changeRoute(event:IonSelect){
  
  this.router.navigate(['/register']);

}
  
}

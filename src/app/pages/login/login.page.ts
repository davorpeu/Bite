import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {

  }
  username: any
  password: any

login(){
this.userService.login(this.username, this.password)
}

 

  
}

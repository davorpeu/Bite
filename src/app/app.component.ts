import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private menu: MenuController, private userService: UserService) {
    // beheeviural subject
    // loading: behaviourSubject<boolean> = 
   
    this.userService._user.subscribe(val =>{
      this.loggedIn = val != null;
    })
  }


async openMenu(){
  await this.menu.open();
}

loggedIn: boolean = false;



closeMenu(){
   this.menu.close();
}

logout(){
  this.userService.logout();
  this.closeMenu()
}


}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { StorageService } from './services/storage/storage.service';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private menu: MenuController, private userService: UserService, private storageService: StorageService, private router: Router) {
    // beheeviural subject
    // loading: behaviourSubject<boolean> = 
   
    this.userService._user.subscribe(val =>{
      this.loggedIn = val != null;
    })

    this.UserLoggedin()
  }

  async UserLoggedin() {
    let userLogged = await this.storageService.getData("user")
     if(userLogged != null){
       this.userService._user.next(userLogged);
       
      this.router.navigate(['/web/dashboard']), { replaceUrl: true }
     }
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

import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { CartService } from './services/cart/cart.service';
import { StorageService } from './services/storage/storage.service';
import { UserService } from './services/user/user.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private menu: MenuController,
    private userService: UserService,
    private storageService: StorageService,
    private cartService: CartService,
    private router: Router,
    // firestore: AngularFirestore,
    private platform: Platform) {

    this.userService.currentUser.subscribe(val => {
      this.loggedIn = val != null;
    })

    this.UserLoggedin()

    this.initializeApp()
  }
  isMobile: boolean;



  // Initialize Firebase



  initializeApp() {

    this.userService.isMobile = this.platform.is('mobileweb') || this.platform.is('mobile')
    this.isMobile = this.userService.isMobile
    this.storageService.getData('user').then(user => {
      this.userService.currentUser.next(user)
      if (this.userService.currentUser) {
        if (this.isMobile) {
          this.storageService.getData(this.userService.currentUser.getValue().userId + 'cart').then(orders => this.cartService.orders.next(orders || []))
          this.router.navigate(['mobile/tabs/dashboard'], { replaceUrl: true })
        }
      }
    });

  }

  async UserLoggedin() {
    let userLogged = await this.storageService.getData("user")
    if (userLogged != null) {
      this.userService.currentUser.next(userLogged);

      this.router.navigate(['/web/dashboard']), { replaceUrl: true }
    }
  }

  async openMenu() {
    await this.menu.open();
  }

  loggedIn: boolean = false;



  closeMenu() {
    this.menu.close();
  }

  logout() {
    this.userService.logout();
    this.closeMenu()
  }


}



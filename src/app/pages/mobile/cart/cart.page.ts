import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { MenuDish } from 'src/app/interfaces/mobile/restaurant';
import { CartService } from 'src/app/services/cart/cart.service';
import { TabsPage } from '../tabs/tabs.page';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  orders: MenuDish[];

  constructor(private cartService: CartService,
    private toastController: ToastController,
    private tabsPage: TabsPage) { }

  ngOnInit() {
    // sort od manjeg do većeg dana od 0 do 4
    this.cartService.orders.subscribe(orders => this.orders = orders.sort((a, b) => a.day - b.day));
    
    
  }

  async finishOrder() {
    await this.cartService.finishOrder();
    this.presentToast();
    //dodaj button finishOrder
    this.tabsPage.cartNumber();

  }

  async presentToast() {
    // const toast = await this.toastController.create({
    //   message: 'Order confirmed',
    //   duration: 2000,
    //   color: 'primary'
    // })
    const toast = await this.toastController.create({
      header: 'Toast header',
      message: 'Click to Close',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    toast.present();
  }

}

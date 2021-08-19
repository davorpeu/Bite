import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CartPageRoutingModule } from './cart-routing.module';
import { CartPage } from './cart.page';
import { DishInMenuComponent } from 'src/app/Component/Menu/dish-in-menu/dish-in-menu.component';
import { OrderComponent } from 'src/app/Component/Order/order/order.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartPageRoutingModule
  ],
  declarations: [CartPage, DishInMenuComponent, OrderComponent]
})
export class CartPageModule { }

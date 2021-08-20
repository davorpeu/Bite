import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CartPageRoutingModule } from './cart-routing.module';
import { CartPage } from './cart.page';
import { OrderComponent } from 'src/app/Component/Order/order/order.component';
import { ComponentsModule } from 'src/app/Component/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [CartPage, OrderComponent]
})
export class CartPageModule { }

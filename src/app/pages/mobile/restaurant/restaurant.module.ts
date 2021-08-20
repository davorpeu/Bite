import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RestaurantPageRoutingModule } from './restaurant-routing.module';
import { RestaurantPage } from './restaurant.page';
import { DishInMenuComponent } from 'src/app/Component/Menu/dish-in-menu/dish-in-menu.component';
import { ComponentsModule } from 'src/app/Component/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [RestaurantPage,]
})
export class RestaurantPageModule {}

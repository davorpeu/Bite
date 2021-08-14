import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';


import { DishComponent } from 'src/app/Component/Dish/dish/dish.component';
import { MenuCompComponent } from 'src/app/Component/Menu/menu-comp/menu-comp.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule
  ],
  declarations: [MenuPage, DishComponent,MenuCompComponent]
})
export class MenuPageModule {}

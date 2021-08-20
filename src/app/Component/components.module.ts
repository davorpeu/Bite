import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DishInMenuComponent } from './Menu/dish-in-menu/dish-in-menu.component';



@NgModule({
  declarations: [
    DishInMenuComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DishInMenuComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }

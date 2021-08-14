import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonSelect } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Dish } from 'src/app/interfaces/dish';
import { Menu } from 'src/app/interfaces/menu';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  static restorauntService: any

  constructor(private router: Router, private restaurantService: RestaurantService) {


  }

 
 

  currentDay = 1;
  days = [1, 2, 3, 4, 5];
  daysName = ['MON', 'TUE', 'WEN', 'THU', 'FRI'];
  daysNamesCro = ['Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak']
  public fetchedMenus: Menu[] = []
  public filteredFetchedMenus: Menu[] = []
  public fetchedDishes: Dish[] = []

  ngOnInit() {
    this.restaurantService.menus.subscribe((menu: Array<Menu>) => {
      this.fetchedMenus = menu;
      this.getMenusForDay();
    })
    this.restaurantService.dishes.subscribe((dish: Array<Dish>) => {
      this.fetchedDishes = dish
      console.log(this.fetchedDishes)
    })

   

  }

  

  changeDay(day: number) {
    this.currentDay = day;
    this.restaurantService.onDayChanged(day);
    this.getMenusForDay();
  }

  getMenusForDay() {
    if (this.fetchedMenus != null) {
      this.filteredFetchedMenus = this.fetchedMenus.filter(o => o.day == this.currentDay);
    

    }
  }

   addToMenu(clickedDish: Dish){
     this.restaurantService.addToMenu(clickedDish)
    
    }

   removeFromMenu(clickedDish: Dish){

  this.restaurantService.removeFromMenu(clickedDish)


   }




}



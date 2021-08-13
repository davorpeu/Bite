import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonSelect } from '@ionic/angular';
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

  constructor(private router: Router,private resorauntService: RestaurantService) { 


  }

  fetchedMenus: Array<Menu> = []
fetchedDishes: Array<Dish> = []

  ngOnInit() {
    this.resorauntService.menus.subscribe((menu: Array<Menu>) => {
      this.fetchedMenus = menu    
      console.log(this.fetchedMenus)
    })
    this.resorauntService.dishes.subscribe((dish: Array<Dish>) => {
      this.fetchedDishes = dish  
      console.log(this.fetchedDishes)    
    })
  }

  daysName = ['MON', 'TUE', 'WEN', 'THU', 'FRI'];
  days = [1, 2, 3, 4, 5];
  daysNamesCro = ['Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak']
  currentDay = 1;

  changeDay(day: number) {
    this.currentDay = day;
    
  }

  getMenusForDay() {
    if (this.fetchedMenus != null)
      return this.fetchedMenus.filter(o => o.day == this.currentDay);     
    return []    
  }



  private newMeal(event:IonSelect){
  
    this.router.navigate(['/new-dish']);
  
  }

}


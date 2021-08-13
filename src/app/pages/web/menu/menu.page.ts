import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonSelect } from '@ionic/angular';
import { Order } from 'src/app/interfaces/order';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';
import { DashboardPage } from '../dashboard/dashboard.page';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private router: Router,private resorauntService: RestaurantService) { 


  }

  fetchedMenus: Array<any> = []


  ngOnInit() {
    this.resorauntService._menus.subscribe((menus: Array<any>) => {
      this.fetchedMenus = menus      
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

  // getOrdersNotForDay() {
  //   if (this.fetchedOtherOrders != null)
  //     return this.fetchedOtherOrders.filter(i => i.dan != this.daysNamesCro[this.currentDay - 1]);
      
      
      
  //   return []
    
  // }

  private newMeal(event:IonSelect){
  
    this.router.navigate(['/new-dish']);
  
  }

}


import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from 'src/app/interfaces/mobile/restaurant';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {

  constructor(private route: ActivatedRoute,
    private restaurantService: RestaurantService
  ) { }

  selectedRestaurant?: Restaurant;

  ngOnInit() {
    // this.route.queryParams.subscribe(params => {
    //   console.log(params)
    // })
this.selectedRestaurant = this.restaurantService.selectedRestaurant

this.restaurantService.getWeekMenuForSelectedRestaurant();
  }

  currentDay = 1;
  days = [1, 2, 3, 4, 5];
  daysName = ['MON', 'TUE', 'WEN', 'THU', 'FRI'];
  daysNamesCro = ['Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak']

  changeDay(day: number) {
    this.currentDay = day;
    this.restaurantService.onDayChanged(day);
    this.getMenusForDay();
  }

  getMenusForDay() {
    // if (this.fetchedMenus != null) {
    //   this.filteredFetchedMenus = this.fetchedMenus.filter(o => o.day == this.currentDay);
    // }
    console.log("menu");
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MenuDish, Restaurant } from 'src/app/interfaces/mobile/restaurant';

import { CartService } from 'src/app/services/cart/cart.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.page.html',
  styleUrls: ['./restaurant.page.scss'],
})
export class RestaurantPage implements OnInit {

  orders: MenuDish[];


  constructor(private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private cartService: CartService
  ) { }

  selectedRestaurant?: Restaurant;

  ngOnInit() {
    // this.route.queryParams.subscribe(params => {
    //   console.log(params)
    // })
    this.selectedRestaurant = this.restaurantService.selectedRestaurant
    this.orders = this.cartService.orders.getValue();
    this.restaurantService.getWeekMenuForSelectedRestaurant();
    this.getMenusForDay();
    this.cartService.orders.subscribe(orders => this.orders = orders)
  }

  currentDay = 1;

  days = [1, 2, 3, 4, 5];

  daysName = ['MON', 'TUE', 'WEN', 'THU', 'FRI'];

  daysNamesCro = ['Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak']

  menuDishes: MenuDish[] = []

  changeDay(day: number) {
    this.currentDay = day;
    this.restaurantService.onDayChanged(day);
    console.log(day);

    this.getMenusForDay();
  }

  getMenusForDay() {
    if (this.selectedRestaurant != null) {
      this.menuDishes = this.selectedRestaurant.menus[this.currentDay - 1].map(dish => {
        dish.inCart = !!this.orders.find(o => o.day === dish.day && o.dishId ===dish.dishId);
        return dish;
      })
    }
  }

  onSelect(dishInMenu: MenuDish) {
    // console.log("napravi");
    dishInMenu.inCart = this.cartService.toggleDishInCart(dishInMenu);
    
  }


}
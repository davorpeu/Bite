import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/interfaces/mobile/restaurant';
import { Order } from 'src/app/interfaces/order';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private restaurantService: RestaurantService) { }


  userOrders: Order[];

  ngOnInit() {
    this.restaurantService.allUserOrders.subscribe(value => {
      if (value.length > 0) {
        this.userOrders = value;
      }
    })

  }




}

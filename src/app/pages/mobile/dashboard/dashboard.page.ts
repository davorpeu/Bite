import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Restaurant } from 'src/app/interfaces/mobile/restaurant';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {


  allRestaurants: Restaurant[];
  filteredRestaurants: Restaurant[];
  constructor(private restaurantService: RestaurantService) { }

  @Output() click2: EventEmitter<Restaurant> = new EventEmitter();


  ngOnInit() {
    this.restaurantService.allRestaurants.subscribe(value => {

      if (value.length > 0) {
        this.allRestaurants = value;
        this.filteredRestaurants = value;
        // this.filteredRestaurants[0] = this.filteredRestaurants[0];
        // this.filteredRestaurants[0].name = 'Novi Restoran'
        // this.allrestaurants = [...value]
        // this.fillteredRestaurants = [...this.allrestaurants];
        this.setImages();
      }

    })
  }

  setImages() {
    this.allRestaurants.forEach(r => {
      const random = Math.floor(Math.random() * 5) + 1;
      r.image = `url("assets/restorani/restoran${random}.jpg")`;
    })
  }

  search(event) {
    const query = event.target.value.toLowerCase();
    this.filteredRestaurants = !query ? [...this.allRestaurants] : this.allRestaurants.filter(r => r.name.toLowerCase().includes(query));
    // ... znači
  }

  getResto() {
    if (this.allRestaurants != null)
      return this.allRestaurants



    return []

  }

  onSelect(restaurant: Restaurant) {

    this.restaurantService.onSelectRestaurant(restaurant)


  }


}

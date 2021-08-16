import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/interfaces/mobile/restaurant';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {


  allRestoraunts: Restaurant[];
  filteredRestaurants: Restaurant[];
  constructor(private restorauntService: RestaurantService) { }



  ngOnInit() {
    this.restorauntService.allRestoraunts.subscribe(value => {
      console.log(this.allRestoraunts)
      if (value.length > 0) {
        this.allRestoraunts = value;
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
    this.allRestoraunts.forEach(r => {
      const random = Math.floor(Math.random() * 5) + 1;
      r.image = `url("assets/restorani/restoran${random}.jpg")`;
    })
  }

  search(event) {
    const query = event.target.value.toLowerCase();
    this.filteredRestaurants = !query ? [...this.allRestoraunts] : this.allRestoraunts.filter(r => r.name.toLowerCase().includes(query));
// ... znači
  }

  getResto() {
    if (this.allRestoraunts != null)
      return this.allRestoraunts



    return []

  }



}

import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/interfaces/order';


import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  static resorauntService: any;

  constructor(private resorauntService: RestaurantService) { }

  fetchedOrders: Array<Order> = []
  filteredOrders: Array<Order> = []

  
  ngOnInit() {
    this.resorauntService._orders.subscribe((order: Array<Order>) => {
      this.fetchedOrders = order
     
      this.filteredOrders = this.fetchedOrders
      
    })

  }
  

  


  daysName = ['MON', 'TUE', 'WEN', 'THU', 'FRI'];
  days = [1, 2, 3, 4, 5];
  daysNamesCro = ['Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak']
  currentDay = 1;

  changeDay(day: number) {
    this.currentDay = day;
    
  }

  getOrdersForDay() {
    if (this.filteredOrders != null)
      return this.filteredOrders.filter(o => o.dan == this.daysNamesCro[this.currentDay - 1]);
      
      
      
    return []
    
  }

  search(event) {
    const query = event.target.value.toLowerCase();
    this.filteredOrders = !query ? [...this.fetchedOrders] : this.fetchedOrders.filter(o => o.jelo.toLowerCase().includes(query));
    // ... znači
  }


}

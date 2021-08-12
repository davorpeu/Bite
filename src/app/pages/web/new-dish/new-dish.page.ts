import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-dish',
  templateUrl: './new-dish.page.html',
  styleUrls: ['./new-dish.page.scss'],
})
export class NewDishPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  soup: boolean = false;
  salad: boolean = false;
  bread: boolean = false;
  soupStatus = this.soup ? 1 : 0
  saladStatus = this.salad ? 1 : 0
  breadStatus = this.bread ? 1 : 0



  soupClicked() {

    this.soup = !this.soup;
    this.soupStatus = this.soup ? 1 : 0


  }

  saladClicked() {
    this.salad = !this.salad;
    this.saladStatus = this.salad ? 1 : 0

  }

  breadClicked() {
    this.bread = !this.bread;
    this.breadStatus = this.bread ? 1 : 0


  }

}

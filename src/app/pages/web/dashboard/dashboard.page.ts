import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  polje = [
    {
      name: 'prvo jelo',
      id:1,
      img: './assets/Meal/meat.png'
    },
    {
      name: 'drugo jelo',
      id:2,
      img: './assets/Meal/meat.png'
    },
    {
      name: 'drugo jelo',
      id: 3,
      img: './assets/Meal/meat.png'
    }
  ]

}

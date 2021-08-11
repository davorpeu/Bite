import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

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


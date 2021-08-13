import { Component, Input, OnInit } from '@angular/core';
import { Dish } from 'src/app/interfaces/dish';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss'],
})
export class DishComponent implements OnInit {

  constructor() { }

  @Input () dish;

  ngOnInit() {
    console.log(this.dish)
  }

}

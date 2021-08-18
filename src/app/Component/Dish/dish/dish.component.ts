import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dish } from 'src/app/interfaces/dish';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss'],
})
export class DishComponent implements OnInit {


  constructor() { }

  @Input() dish: Dish;
  @Output() click2: EventEmitter<Dish> = new EventEmitter();

  ngOnInit() {

  }

  addToMenu() {
    this.click2.emit(this.dish)
  }

}

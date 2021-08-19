import { Component, Input, OnInit } from '@angular/core';
import { MenuDish } from 'src/app/interfaces/mobile/restaurant';

@Component({
  selector: 'app-menu-dish',
  templateUrl: './menu-dish.component.html',
  styleUrls: ['./menu-dish.component.scss'],
})
export class DishInMenuComponent implements OnInit {

  constructor() { }

  @Input () dishInMenu: MenuDish;
  ngOnInit() {}

}

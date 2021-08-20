import { Component, Input, OnInit } from '@angular/core';
import { MenuDish } from 'src/app/interfaces/mobile/restaurant';

@Component({
  selector: 'app-dish-in-menu',
  templateUrl: './dish-in-menu.component.html',
  styleUrls: ['./dish-in-menu.component.scss'],
})
export class DishInMenuComponent implements OnInit {

  constructor() { }

  @Input () dishInMenu: MenuDish;
  @Input () dishSelected: boolean;
  ngOnInit() {}

}

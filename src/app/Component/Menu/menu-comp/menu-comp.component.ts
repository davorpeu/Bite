import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu';
import { MenuDish } from 'src/app/interfaces/mobile/restaurant';


@Component({
  selector: 'app-menu-comp',
  templateUrl: './menu-comp.component.html',
  styleUrls: ['./menu-comp.component.scss'],
})
export class MenuCompComponent implements OnInit {

  constructor() { }

  @Input () menu;
  @Output ()  click2:  EventEmitter<Menu> = new EventEmitter();
  @Input() dishSelected: MenuDish;
  
  ngOnInit() {}

 removeFromMenu(){
    this.click2.emit(this.menu)
  }

}

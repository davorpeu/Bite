import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu';


@Component({
  selector: 'app-menu-comp',
  templateUrl: './menu-comp.component.html',
  styleUrls: ['./menu-comp.component.scss'],
})
export class MenuCompComponent implements OnInit {

  constructor() { }

  @Input () menu;
  @Output ()  click:  EventEmitter<Menu> = new EventEmitter();

  ngOnInit() {}

 removeFromMenu(){
    this.click.emit(this.menu)
  }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-comp',
  templateUrl: './menu-comp.component.html',
  styleUrls: ['./menu-comp.component.scss'],
})
export class MenuCompComponent implements OnInit {

  constructor() { }

  @Input () menu;
  
  ngOnInit() {}


}

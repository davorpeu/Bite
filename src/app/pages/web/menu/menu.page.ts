import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonSelect } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private router: Router) { }

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

  private newMeal(event:IonSelect){
  
    this.router.navigate(['/new-dish']);
  
  }

}


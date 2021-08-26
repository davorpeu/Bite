import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-new-dish',
  templateUrl: './new-dish.page.html',
  styleUrls: ['./new-dish.page.scss'],
})
export class NewDishPage implements OnInit {

  constructor(
    private restaurantService: RestaurantService,
    private firebaseStorage: AngularFireStorage,
    private userService: UserService,
    private router: Router
    // private angularFirestore: AngularFirestore,
  ) { }

  ngOnInit() {
    //this.items = this.angularFirestore.collection('items').valueChanges();

  }



  items: Observable<any[]>;

  dishName: string;
  userId: number;
  soup: boolean = false;
  salad: boolean = false;
  bread: boolean = false;
  soupStatus = this.soup ? 1 : 0
  saladStatus = this.salad ? 1 : 0
  breadStatus = this.bread ? 1 : 0
  dishDescription: string;
  dishImage: File = null;
  imageUrl: string


  soupClicked() {

    this.soup = !this.soup;
    this.soupStatus = this.soup ? 1 : 0


  }

  saladClicked() {
    this.salad = !this.salad;
    this.saladStatus = this.salad ? 1 : 0

  }

  breadClicked() {
    this.bread = !this.bread;
    this.breadStatus = this.bread ? 1 : 0


  }

  async onFileSelected(event: any) {
    console.log(event);
    this.dishImage = event.target.files
    let userId = this.userService.currentUser.value.userId
    let companyId = this.userService.currentUser.value.companyId
    let fileToUpload = this.dishImage[0]
    this.imageUrl = await this.uploadDishImage(`${companyId}${userId}`, fileToUpload)
    console.log(`URL -> ${this.imageUrl}`)
  }



  newDish() {
    this.restaurantService.addNewDish(this.dishName, this.soupStatus, this.saladStatus, this.breadStatus, this.dishDescription)
    this.uploadDishImage
  }

  async uploadDishImage(childFirebasePath: string, file: any): Promise<string> {
    try {
      const task = await this.firebaseStorage.ref('/dishImage').child(childFirebasePath).put(file)
      return await this.firebaseStorage.ref(`/dishImage/${childFirebasePath}`).getDownloadURL().toPromise()
    } catch (error) {
      console.log(error);
    }
  }

  //dopuni
  cancelDish() {
    this.router.navigate(['/web/menu']), { replaceUrl: true }
  }

}

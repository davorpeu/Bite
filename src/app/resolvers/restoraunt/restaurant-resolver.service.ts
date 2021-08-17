import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';
import { UserService } from 'src/app/services/user/user.service';


@Injectable({
  providedIn: 'root'
})
export class RestaurantResolverService implements Resolve<boolean> {

  constructor(private userService: UserService, private restaurantService: RestaurantService) { }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    if(!this.userService.isMobile){
      return await this.restaurantService.initRestaurantForCompanyUser();
      //restoran

    }
    else {
      console.log('resolve');
      
      return await this.restaurantService.initRestaurantForCostumerUser().toPromise();
      //korisnik
    }
  }
}

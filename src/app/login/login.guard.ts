import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map, switchMap, take } from 'rxjs/operators';
import { LoginService } from './login.service';
import { LoadingController, NavController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    constructor(
        private router: Router,
        private loginService: LoginService,
        private navCtrl: NavController,
        private loadingCtrl: LoadingController
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        this.isAuthenticated(state.url).then(d => console.log(`guard: ${d}`));

        return this.isAuthenticated(state.url);
    }

    async isAuthenticated(path: any) {

        // const tokentime = parseInt(localStorage.getItem('time_token'), 10);
        // const unixtime = ((new Date().getTime()) / 1000);

        // if(unixtime < (tokentime + 3600)) {
        //     return true;
        // }
        // else {
        //     this.navCtrl.navigateRoot('/login');
        //     return true;
        // }
        if(!localStorage.getItem('id')){
          this.navCtrl.navigateRoot('/login')
          return true;
        }else{
          return true
        }

    }
}

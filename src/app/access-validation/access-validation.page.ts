import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-access-validation',
  templateUrl: './access-validation.page.html',
  styleUrls: ['./access-validation.page.scss'],
})
export class AccessValidationPage implements OnInit {

  constructor(
    public navCtrl: NavController,
  ) { }

  ngOnInit() {
    if(this.checkIfUserIsLogged()){
      this.navCtrl.navigateRoot('/home');
    }
    else{
      this.navCtrl.navigateRoot('/login');
    }
  }

  checkIfUserIsLogged() {
    return localStorage.getItem('login') && localStorage.getItem('password') ? true : false;
  }

}

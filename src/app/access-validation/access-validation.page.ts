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
      if(localStorage.getItem('type') == '1'){
        this.navCtrl.navigateRoot('/home');
      }else{
        this.navCtrl.navigateRoot('/students');
      }
    }
    else{
      this.navCtrl.navigateRoot('/login');
    }
  }

  checkIfUserIsLogged() {
    return localStorage.getItem('id') && localStorage.getItem('name') ? true : false;
  }

}

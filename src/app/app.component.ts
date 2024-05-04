import { Component } from '@angular/core';
import { LoginService } from './login/login.service';
import { LoadingController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Carteirinha Digital', url: '/home', icon: 'id-card' },
    { title: 'Solicitar Carteirinha', url: '/folder/inbox', icon: 'today' },
  ];
  constructor(private loginService: LoginService, private loadingCtrl: LoadingController, private navCtrl: NavController) {}

  logout() {

    this.loadingCtrl.create({
      message: 'Saindo da conta...',
      mode:  'ios'
    }).then(loadingEl => {
      loadingEl.present();
      this.loginService.logout().subscribe(() =>{
        this.navCtrl.navigateRoot('/');
        loadingEl.dismiss();
      });
    });
  }
}

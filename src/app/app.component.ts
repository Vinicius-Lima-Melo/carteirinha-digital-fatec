import { Component } from '@angular/core';
import { LoginService } from './login/login.service';
import { LoadingController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user: any
  public appPages = [
    { title: 'Carteirinha Digital', url: '/home', icon: 'id-card' , userType: 1},
    // { title: 'Solicitar Carteirinha', url: '/folder/inbox', icon: 'today' , userType: 1},
    { title: 'Validar Carteirinha', url: '/validate-student', icon: 'qr-code' , userType: 2},
    { title: 'Gestão de Alunos', url: '/students', icon: 'newspaper' , userType: 2},
  ];
  constructor(private loginService: LoginService, private loadingCtrl: LoadingController, private navCtrl: NavController) {}

  ngOnInit(){
    this.loginService.user$.subscribe(v =>{
      console.log("User data changed", v)
      this.user = v
    })
  }
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

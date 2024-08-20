import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import { skipWhile, first } from 'rxjs';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  hidePassword = true;
  form: FormGroup;
  checkedUser = false;
  id_empresa_vendedora: any;

  showMsgPreCadastro = false;


  description = 'Insira seu login';
  showLoadingChecking = false;

  employee_id: any;


  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private alertController: AlertController,
  ) {
    this.form = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {

  }


  login() {
    if(!this.form.value.login || !this.form.value.password) {
      return;
    }
    this.loadingCtrl.create({
      message: 'Aguarde...',
      mode:  'ios'
    }).then(loadingEl => {
      loadingEl.present();
      let login = this.form.value.login;


      this.loginService.login(login, this.form.value.password).subscribe((a) => {
        debugger
        this.loginService.profile().pipe(skipWhile(user => !user), first()).subscribe((user: any) => {
            if(user) {
              localStorage.setItem('login', login);
              localStorage.setItem('password', this.form.value.password);
              this.form.reset();
              loadingEl.dismiss();
              this.navCtrl.navigateForward(['/', 'home']);
            }
          });
        },
        (err: any) => {
          loadingEl.dismiss();
          this.presentAlert('Credenciais incorretas e/ou login inexistente');
        }
      );
    });
  }

  async presentAlert(msg: string) {
      const alert = await this.alertController.create({
        header: msg,
        mode: 'ios',
        buttons: ['OK'],
      });
      await alert.present();
  }
}

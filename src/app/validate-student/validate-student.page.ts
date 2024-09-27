import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { BarcodeFormat } from '@zxing/library';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
import { first } from 'rxjs';
import { ModalValidStudentComponent } from '../modal-valid-student/modal-valid-student.component';

@Component({
  selector: 'app-validate-student',
  templateUrl: './validate-student.page.html',
  styleUrls: ['./validate-student.page.scss'],
})
export class ValidateStudentPage implements OnInit {
  @ViewChild('scan', { static: true }) scan: ElementRef<any> | any;
  @ViewChild(NgxScannerQrcodeComponent)
  scanner?: NgxScannerQrcodeComponent;
  devices: any
  logs:any
  backCam = null

  output!: any
  lastData = null
  validStudent = false
  invalidStudent = false
  carteirinhas_validas = [
    {ra: '123', name: 'João', image: 'estudante_joao.jpg'},
    {ra: '321', name: 'Maria', image: 'estudante_maria.jpg'},
  ];
  awaitAnimation = false

  constructor(private alertController: AlertController, private modalController: ModalController) { }

  ngOnInit() {
    navigator.mediaDevices.getUserMedia( {video: true } )
    .then( ( stream ) => {
      try{
        this.scan.devices.subscribe((devices: any) => {
          console.log("devices", devices)
          this.devices = devices
          const device = devices.find((f:any) => (/back|trás|rear|traseira|environment|ambiente/gi.test(f.label))) ?? devices.pop();
          console.log(device)
          if(device){
            this.backCam = device.deviceId
            this.scan.stop()
            this.scan.playDevice(device.deviceId);
          }
          this.logs = device
          // this.scanner.playDevice(device.deviceId);
        }); // or subscribe
        // debugger

      } catch(e){
        alert("Nao foi possivel usar a camera traseira")
      }
    },
    e => {
        alert("sem permissao")

    } );



    this.scan.data.subscribe((data: any) => {
      console.log("await", this.awaitAnimation)
      if(this.awaitAnimation) return
      if(data.length > 0 && data[0].value !== this.lastData){
        this.lastData = data[0].value
        this.output = data[0].value
        let check = this.carteirinhas_validas.filter((carteirinha) => carteirinha.ra === this.output)
        if(check.length > 0){
          // this.showSuccessAnimation()
          this.openModalValidStudent(check[0])
        }
        else{
          this.showErrorAnimation()
        }
        console.log(data, this.lastData)
      }
      else{
        console.log("nada")
      }
    })
  }

  showSuccessAnimation(){
    this.validStudent = true
    setTimeout(() => {
      this.lastData = null
      this.validStudent = false
      this.output = null
    }, 3000);
    console.log("sucesso")
  }
  showErrorAnimation(){
    this.awaitAnimation = true
    this.invalidStudent = true
    setTimeout(() => {
      this.lastData = null
      this.invalidStudent = false
      this.output = null
      this.awaitAnimation = false
    }, 3000);
    console.log("erro")
  }


  scanSuccessHandler($event:any){
    console.log("sucesso: ", $event)
  }
  scanErrorHandler($event:any){
    console.log($event)
  }
  scanFailureHandler($event:any){
  }
  scanCompleteHandler($event:any){
    console.log($event)
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permissão necessária',
      message: 'Por favor, conceda permissão para acessar a câmera.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  openModalValidStudent(student: any){
    this.awaitAnimation = true
    this.modalController.create({
      component: ModalValidStudentComponent,
      componentProps: {
        student: student
      }
    }).then(modal => {
      modal.present();
      modal.onDidDismiss().then(() => this.awaitAnimation = false)
    })

    this.lastData = null
    this.validStudent = false
    this.output = null
  }

  refreshCam(){
    this.scan.stop()
    this.scan.playDevice(this.backCam);
  }
}

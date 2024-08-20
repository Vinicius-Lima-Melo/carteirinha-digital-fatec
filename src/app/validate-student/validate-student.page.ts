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

  output!: any
  lastData = null
  validStudent = false
  invalidStudent = false
  carteirinhas_validas = [
    {ra: '123', name: 'João', image: 'estudante_joao.jpg'},
    {ra: '321', name: 'Maria', image: 'estudante_maria.jpg'},
  ];

  constructor(private alertController: AlertController, private modalController: ModalController) { }

  ngOnInit() {
    this.scan.data.subscribe((data: any) => {
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
    this.invalidStudent = true
    setTimeout(() => {
      this.lastData = null
      this.invalidStudent = false
      this.output = null
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
    this.modalController.create({
      component: ModalValidStudentComponent,
      componentProps: {
        student: student
      }
    }).then(modal => {
      modal.present();
    })
    this.lastData = null
    this.validStudent = false
    this.output = null
  }

}

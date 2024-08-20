import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BarcodeFormat } from '@zxing/library';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
import { first } from 'rxjs';

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
  constructor(private alertController: AlertController) {
  }

  ngOnInit() {
    console.log(this.scan)
    this.scan.data.subscribe((data: any) => {
      if(data.length > 0 && data[0].value !== this.lastData){
        this.lastData = data[0].value
        this.output = data[0].value
        if(this.output === '123456'){
          this.showSuccessAnimation()
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

}




import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-valid-student',
  templateUrl: './modal-valid-student.component.html',
  styleUrls: ['./modal-valid-student.component.scss'],
})
export class ModalValidStudentComponent  implements OnInit {
  @Input() student: any;
  image_prefix = './../../assets/'
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log(this.student)
  }

  closeModal(){
    this.modalController.dismiss();
  }
}

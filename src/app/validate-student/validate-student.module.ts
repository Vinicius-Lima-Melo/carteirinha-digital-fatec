import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidateStudentPageRoutingModule } from './validate-student-routing.module';

import { ValidateStudentPage } from './validate-student.page';
import { LOAD_WASM, NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';

LOAD_WASM().subscribe();


@NgModule({
  imports: [
    NgxScannerQrcodeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ValidateStudentPageRoutingModule
  ],
  declarations: [ValidateStudentPage]
})
export class ValidateStudentPageModule {}

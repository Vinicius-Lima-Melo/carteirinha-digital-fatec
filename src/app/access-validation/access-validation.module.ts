import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccessValidationPageRoutingModule } from './access-validation-routing.module';

import { AccessValidationPage } from './access-validation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccessValidationPageRoutingModule
  ],
  declarations: [AccessValidationPage]
})
export class AccessValidationPageModule {}

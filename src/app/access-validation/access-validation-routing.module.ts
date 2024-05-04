import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccessValidationPage } from './access-validation.page';

const routes: Routes = [
  {
    path: '',
    component: AccessValidationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccessValidationPageRoutingModule {}

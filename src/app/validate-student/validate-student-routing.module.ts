import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidateStudentPage } from './validate-student.page';

const routes: Routes = [
  {
    path: '',
    component: ValidateStudentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidateStudentPageRoutingModule {}

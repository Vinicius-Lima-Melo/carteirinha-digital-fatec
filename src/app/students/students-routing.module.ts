import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentsPage } from './students.page';
import { NewStudentComponent } from './new-student/new-student.component';
import { CommonModule, JsonPipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: StudentsPage
  },
  {
    path: 'add-student',
    component: NewStudentComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    IonicModule
  ],
  exports: [RouterModule],
})
export class StudentsPageRoutingModule {}

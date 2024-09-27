import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentsPage } from './students.page';
import { NewStudentComponent } from './new-student/new-student.component';

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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsPageRoutingModule {}

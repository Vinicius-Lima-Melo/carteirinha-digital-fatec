import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './login/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'access-validation',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [LoginGuard],
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'access-validation',
    loadChildren: () => import('./access-validation/access-validation.module').then( m => m.AccessValidationPageModule)
  },
  {
    path: 'validate-student',
    canActivate: [LoginGuard],
    loadChildren: () => import('./validate-student/validate-student.module').then( m => m.ValidateStudentPageModule)
  },
  {
    path: 'students',
    canActivate: [LoginGuard],
    loadChildren: () => import('./students/students.module').then( m => m.StudentsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

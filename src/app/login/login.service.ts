import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  login(login: string, password: string) {
    return of(true);
  }
  profile() {
    return of(true);
  }
  logout() {
    localStorage.removeItem('login');
    localStorage.removeItem('password');
    return of(true);
  }
}

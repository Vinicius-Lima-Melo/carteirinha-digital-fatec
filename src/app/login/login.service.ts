import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  users = [
    {
      id: 0,
      type: 1,
      name: "Aluno de Teste",
      login: 'aluno',
      senha: '123'
    },
    {
      id: 0,
      type: 2,
      name: "Admin de Teste",
      login: 'admin',
      senha: '123'
    },
  ]

  private subscription = new Subscription;
  private user = new BehaviorSubject<any>(null);
  user$ = this.user.asObservable();

  constructor() { }

  login(login: string, password: string) {
    let user:any = this.users.filter(v => v.login === login)[0]
    if(!user){
       return of(false)
    }
    localStorage.setItem('id', user.id)
    localStorage.setItem('type', user.type)
    localStorage.setItem('name', user.name)
    return of(true);
  }
  profile() {
    if(!localStorage.getItem('id')){return of()}
    this.user.next({
      id: localStorage.getItem('id'),
      type: localStorage.getItem('type'),
      name: localStorage.getItem('name'),
    })
    return of({
      id: localStorage.getItem('id'),
      type: localStorage.getItem('type'),
      name: localStorage.getItem('name'),
    })
  }
  logout() {
    this.user.next(null)
    localStorage.removeItem('login');
    localStorage.removeItem('password');
    localStorage.removeItem('id')
    localStorage.removeItem('type')
    localStorage.removeItem('name')
    return of(true);
  }
}

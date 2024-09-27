import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  users = [
    {
      id: 1,
      type: 1,
      name: "Joao",
      login: 'aluno',
      senha: '123',
      uuid: '123'
    },
    {
      id: 1,
      type: 1,
      name: "Maria",
      login: 'aluno2',
      senha: '123',
      uuid: '321'
    },
    {
      id: 2,
      type: 1,
      name: "Aluno Fake",
      login: 'fake',
      senha: '123',
      uuid: '111'
    },
    {
      id: 3,
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
    localStorage.setItem('uuid', user.uuid)
    return of(true);
  }
  profile() {
    if(!localStorage.getItem('id')){return of()}
    this.user.next({
      id: localStorage.getItem('id'),
      type: localStorage.getItem('type'),
      name: localStorage.getItem('name'),
      uuid: localStorage.getItem('uuid'),
    })
    return of({
      id: localStorage.getItem('id'),
      type: localStorage.getItem('type'),
      name: localStorage.getItem('name'),
      uuid: localStorage.getItem('uuid'),
    })
  }
  logout() {
    this.user.next(null)
    localStorage.removeItem('login');
    localStorage.removeItem('password');
    localStorage.removeItem('id')
    localStorage.removeItem('type')
    localStorage.removeItem('name')
    localStorage.removeItem('uuid')
    return of(true);
  }
}

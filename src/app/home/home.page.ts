import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user: any
  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.profile().subscribe(profile =>{
      this.user = profile
      debugger
    })
  }

}

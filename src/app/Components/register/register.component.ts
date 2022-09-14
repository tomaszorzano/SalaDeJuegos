import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { Usuario } from 'src/app/shared/usuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string = "";
  password: string = "";
  error: any;
  msjError!: string;
  usuario = new Usuario();
  
  constructor(public router: Router, public authSvc: AuthService) { }

  ngOnInit(): void {
  }
  async onRegister() {
  
    this.usuario.email = this.email;
      this.usuario.password = this.password;
      await this.authSvc.register(this.usuario);
      if(this.authSvc.msjError != "")
      {
        this.msjError = this.authSvc.msjError;
      }
      else
      {
        this.router.navigate(['login']);
      }
  }
}

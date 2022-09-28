import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { Usuario } from 'src/app/shared/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";
  usuario: Usuario = new Usuario();
  msjError!: string;

  constructor(public router: Router,public authSvc: AuthService) {


   }

  ngOnInit(): void {
  }

  async onLogin() {
    
    this.usuario.email = this.email;
    this.usuario.password = this.password;
    await this.authSvc.login(this.usuario.email, this.usuario.password);
    console.log("error", this.authSvc.msjError);
    if (this.authSvc.msjError != "") {
      this.msjError = this.authSvc.msjError;
    }
    else {
      this.router.navigate(['Home']);
    }
  }

}

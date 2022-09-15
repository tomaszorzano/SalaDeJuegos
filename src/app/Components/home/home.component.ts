import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { Usuario } from 'src/app/shared/usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  email!: string;
  public usuario$: Observable<any> = this.authSvc.afAuth.user;
  msjError!: string;
  constructor(public router: Router,public authSvc: AuthService) { }

  ngOnInit(): void 
  {
  }

  async onLogout() {
    
    await this.authSvc.logout();
    console.log("error", this.authSvc.msjError);
    if (this.authSvc.msjError != "") {
      this.msjError = this.authSvc.msjError;
    }
    else {
      this.router.navigate(['login']);
    }
  }
  goLogin(){
    this.router.navigate(['login']);
  }
  goRegistro(){
    this.router.navigate(['Register']);
  }


}

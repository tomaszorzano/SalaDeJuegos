import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  email!: string;
  public usuario$: Observable<any> = this.authSvc.afAuth.user;
  msjError!: string;
  constructor(public router: Router,public authSvc: AuthService) { 

    setTimeout(()=>{
      this.onLogout();
    },1000000);

  }

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
  goHome(){
    this.router.navigate(['Home']);
  }


}

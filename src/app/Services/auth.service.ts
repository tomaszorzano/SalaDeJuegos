import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Usuario } from '../shared/usuario';
import { UsuarioService } from './usuario.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public usuario: any;
  msjError: string = "";

  constructor(public afAuth: AngularFireAuth, private router: Router, public usuarioSvc: UsuarioService) { }

  async login(email: string, password: string) {

    return await this.afAuth.signInWithEmailAndPassword(email, password).then((result) => {
      this.msjError = "";
      if(result.user)
      {
        this.usuario = new Usuario();
        this.usuario.id = result.user?.uid;
        this.usuario.email = result.user?.email;
        console.log(this.usuario);
        
      }

    })
    .catch((res) => {
        console.log(res.code);
        if (res.code == "auth/email-already-in-use") {
          this.msjError = "El email ingresado ya esta en uso."
        }
        if (res.code == "auth/invalid-email") {
          this.msjError = "El formato del email no es correcto."
        }
      });

  }

  //register
  async register(user: Usuario) {

    return await this.afAuth.createUserWithEmailAndPassword(user.email, user.password).then((result) => {
      this.msjError = "";

      if(result.user){
        this.usuarioSvc.registrarUsuario(result.user, result.user.uid);
      }
    })
      .catch((res) => {
        console.log(res.message);
        if (res.code == "auth/email-already-in-use") {
          this.msjError = "El email ingresado ya esta en uso."
        }
        if (res.code == "auth/invalid-email") {
          this.msjError = "El formato del email no es correcto."
        }
      });
  }



  async getUserLogged() {
    return this.afAuth.onAuthStateChanged(usuario => {
      if(usuario)
      {
        console.log(usuario);
        
      }
    });
  }

  logout() {
    this.afAuth.signOut();
  }


}
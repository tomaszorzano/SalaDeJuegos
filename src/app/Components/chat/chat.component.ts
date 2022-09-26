import { Component, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';

import { ChatService } from 'src/app/Services/chat.service';


import { ChatMensaje } from 'src/app/shared/chat';
import { Usuario } from 'src/app/shared/usuario';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

 
  msjUsuario!: any;
  mensajes!: AngularFireList<ChatMensaje>;
  msjs: any;
  lsUsuarioEmail!: any;
  usuarioActual: boolean = false;
  mail!: string;
  public usuario$: Observable<any> = this.authSvc.afAuth.user;
  usuario!: any;
  userMail!: string;
  constructor(public authSvc: AuthService, private chatSvc: ChatService, public router: Router) {
    this.usuario$.subscribe((result: any) => {
      this.userMail = result['email'];
    });

   }

  ngOnInit(): void {
    this.getMensajes();
  }

  getMensajes() {
    this.chatSvc.getMensajesList().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe((mensajes: any) => {
      this.msjs = mensajes;
      this.msjs.forEach((element:any) =>{
        if(this.userMail.includes(element.email)){
          element.usrActual = true;
        }
      });
    });
  }

  enviarMensaje(){
    let msj = new ChatMensaje();
    msj.mensaje = this.msjUsuario;
    msj.fecha = new Date().toLocaleString();
    msj.email = this.userMail;
    msj.usrActual = false;
    this.chatSvc.addMensaje(msj);
    this.msjUsuario = "";
  }
}
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList,  } from '@angular/fire/compat/database';
import { ChatMensaje } from '../shared/chat';
import { Usuario } from '../shared/usuario';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  dbPath: string =  'mensajes';
  mensajesRef!: AngularFireList<ChatMensaje>;

  constructor(private dbRT: AngularFireDatabase) {
    this.mensajesRef = dbRT.list(this.dbPath);
   }

   addMensaje(mensaje: ChatMensaje){
    this.mensajesRef.push(mensaje);
   }

   getMensajesList(): AngularFireList<ChatMensaje> {
    return this.mensajesRef;
  }
  
  
}
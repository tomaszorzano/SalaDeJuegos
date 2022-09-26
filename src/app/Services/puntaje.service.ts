import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Puntos } from '../shared/puntos';

@Injectable({
  providedIn: 'root'
})
export class PuntajeService {

  dbPathMM: string =  'puntajesMayorMenor';
  dbPathPgts: string =  'puntajesPreguntados';
  dbPathAhdo: string =  'puntajesAhorcado';
  dbPathFchs: string =  'puntajesFlechas';
  puntajesCollectionMM!: AngularFirestoreCollection<Puntos>;
  puntajesCollectionPgts!: AngularFirestoreCollection<Puntos>;
  puntajesCollectionAhdo!: AngularFirestoreCollection<Puntos>;
  puntajesCollectionFchs!: AngularFirestoreCollection<Puntos>;
  puntajes!: Observable<Puntos[]>;

  constructor(public db: AngularFirestore, public router: Router, public afAuth: AngularFireAuth) {
   }

   cargarPuntajesMM(){
    // setTimeout(() => {
      this.puntajesCollectionMM = this.db.collection<Puntos>(this.dbPathMM, ref => ref.orderBy('puntos','desc'));
    // }, 100);
    setTimeout(() => {
      this.getPuntajes(this.puntajesCollectionMM);
    }, 1000);
   }

   cargarPuntajesPgts(){
    //setTimeout(() => {
      this.puntajesCollectionPgts = this.db.collection<Puntos>(this.dbPathPgts, ref => ref.orderBy('puntos','desc'));
    //}, 100);
    setTimeout(() => {
      this.getPuntajes(this.puntajesCollectionPgts);
    }, 1000);
   }

   cargarPuntajesAhdo(){
    //setTimeout(() => {
      this.puntajesCollectionAhdo = this.db.collection<Puntos>(this.dbPathAhdo, ref => ref.orderBy('puntos','desc'));
    //}, 100);
    setTimeout(() => {
      this.getPuntajes(this.puntajesCollectionAhdo);
    }, 1000);
   }

   cargarPuntajesFchs(){
    //setTimeout(() => {
      this.puntajesCollectionFchs = this.db.collection<Puntos>(this.dbPathFchs, ref => ref.orderBy('puntos','desc'));
    //}, 100);
    setTimeout(() => {
      this.getPuntajes(this.puntajesCollectionFchs);
    }, 1000);
   }

   addPuntaje(usuarioId: string, usuario: string, puntaje: number, collection: AngularFirestoreCollection){
    collection.add(
      { idUsuario: usuarioId,
        usuario: usuario,
        puntos: puntaje,
        fecha: new Date().toLocaleString()
      }
    );
   }

   getPuntajes(collection: AngularFirestoreCollection){
     this.puntajes = collection.snapshotChanges().pipe(
       map(actions => actions.map(a => a.payload.doc.data() as Puntos))
     );
     console.log(this.puntajes);
  }
}
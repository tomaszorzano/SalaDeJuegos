import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { PuntajeService } from 'src/app/Services/puntaje.service';

import { Puntos } from 'src/app/shared/puntos';
import { Usuario } from 'src/app/shared/usuario';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {

  @Output() seCreaAbecedario: EventEmitter<any> = new EventEmitter<any>();

  
  palabras: string[] = ["tormenta", "animal", "Fracazar", "Laberinto", "Enredadera"];
  palabrasAux!: string[];
  palabra!: string;
  palabraEnGuiones!: string;
  letra = {"nombre": ''};
  letras = [{"nombre": 'A'},{"nombre": 'B'},{"nombre": 'C'},{"nombre": 'D'},{"nombre": 'E'},{"nombre": 'F'},{"nombre": 'G'},{"nombre": 'H'},
  {"nombre": 'I'},{"nombre": 'J'},{"nombre": 'K'},{"nombre": 'L'},{"nombre": 'M'},{"nombre": 'N'},{"nombre": 'Ñ'},{"nombre": 'O'},
  {"nombre": 'P'},{"nombre": 'Q'},{"nombre": 'R'},{"nombre": 'S'},{"nombre": 'T'},{"nombre": 'U'},{"nombre": 'V'},{"nombre": 'W'},
  {"nombre": 'X'},{"nombre": 'Y'},{"nombre": 'Z'}]; 
  arrayLetras: any = [];
  errores!: number;
  mensaje!: string;
  empezado: boolean = false;
  resultado: boolean = false;
  puntos!: number;
  puntosAux!: number;
  listaPuntajes: Array<Puntos> = new Array<Puntos>();
  listaOrdenada: Array<Puntos> = new Array<Puntos>();
  usuario: Usuario = new Usuario();
  palabraCompletada: boolean = false;
  juegoCompletado: boolean = false;
  public usuario$: Observable<any> = this.authService.afAuth.user;


  constructor(public router: Router, public authService: AuthService, public puntajeSvc: PuntajeService) {
    this.puntajeSvc.cargarPuntajesAhdo();
    this.usuario$.subscribe((result: any) => {
      this.usuario.email = result['email'];
      this.usuario.id = result['uid']

    });
   }

  ngOnInit(): void {
    //this.usuario = JSON.parse(this.ls.get('usuarioLs'));
    this.crearAbecedario();
    this.puntosAux = 0;
  }

  empezar(){
    document.querySelector("#horca")?.setAttribute("src", "../../../../assets/ahorcado/ahorcado.jpg");
    this.palabrasAux = this.palabras;
    var i = Math.floor(Math.random()* this.palabrasAux.length);
    this.palabra = this.palabrasAux[i];
    console.log(this.palabrasAux);
    console.log(this.palabra);
    if(this.palabra){
      this.palabraEnGuiones = this.palabra.replace(/./g, "_ ");
    }
    
    console.log(this.palabra + ' - ' + this.palabraEnGuiones);
    this.palabrasAux.splice(i, 1);
    
    console.log(this.palabrasAux);
    
    this.errores = 0;
    this.empezado = true;
    this.resultado = false;
    this.juegoCompletado = false;
    this.palabraCompletada = false;
    
  }

  crearAbecedario(){
    this.letras.forEach(element => {
      let instancia = {nombre: element.nombre};
      this.seCreaAbecedario.emit(instancia);
      this.agregarNuevoProducto(instancia);
    });
  }
  
  onLetra(letra: string){

    let coincidencias = 0;

    for (let index = 0; index < this.palabra.length; index++) {
      const element = this.palabra[index];
      
      if(letra.toLowerCase() == element){
        console.log('letra correcta');
        this.palabraEnGuiones = this.replaceAt(index*2, element.toLocaleUpperCase());
       // this.palabraEnGuiones = this.palabraEnGuiones.replace(, element);
        console.log(this.palabraEnGuiones);
        coincidencias++;
      }
    }

    if(coincidencias == 0){
      this.errores++;
      console.log(coincidencias);
      
      console.log(this.errores);
      this.cambiarImagen();
    }

    if(this.palabraEnGuiones.indexOf('_') < 0){
      this.mensaje = "Ganaste!!!";
      this.empezado = false;
      this.resultado = true;
      this.puntos = this.palabra.length * 10;
      this.puntosAux += this.puntos;
      this.palabraCompletada = true;
      if(this.palabrasAux.length <= 0){
        this.mensaje =  "Juego Completado!!";
        this.palabraCompletada = false;
        this.juegoCompletado = true;
      }
      this.addPuntaje(this.usuario.id, this.usuario.email, this.puntosAux);
      this.cargarPuntajes();
    }

    
  }

  replaceAt(index: number, char: string) {
    var a = this.palabraEnGuiones.split("");
    a[index] = char;
    return a.join("");
  }

  agregarNuevoProducto(letra: any){
    this.arrayLetras.push(letra);
  }

  cambiarImagen()
  {
    switch(this.errores){
      case 1:
        console.log(this.errores);
        document.querySelector("#horca")?.setAttribute("src", "../../../../assets/ahorcado/torso.jpg");
        break;
      case 2:
        document.querySelector("#horca")?.setAttribute("src", "../../../../assets/ahorcado/piernas.jpg");
        break;
      case 3:
        document.querySelector("#horca")?.setAttribute("src", "../../../../assets/ahorcado/muerte.jpg");
        this.mensaje = "Perdiste!!!";
        this.resultado = true;
        this.empezado = false;
        this.puntosAux = this.puntos;
        this.puntos = 0;
        this.palabraCompletada = false;
        this.addPuntaje(this.usuario.id, this.usuario.email, this.puntosAux);
        this.cargarPuntajes();
        break;
      
    }
  }

  cargarPuntajes(){
    this.listaPuntajes = [];
    this.puntajeSvc.puntajes.subscribe((puntaje:any) =>{
      this.listaPuntajes = puntaje;
      this.listaOrdenada = this.listaPuntajes.slice(0, 10);
      //this.ordenarListaPuntajes();
      console.log(puntaje);
      console.log(this.resultado);
      
    });
  }

  addPuntaje(usuarioId: string, usuario: string, puntaje: number){
    this.puntajeSvc.addPuntaje(usuarioId, usuario, puntaje, this.puntajeSvc.puntajesCollectionAhdo);
  }

}
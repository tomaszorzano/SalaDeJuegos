import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { PuntajeService } from 'src/app/Services/puntaje.service';
import { Puntos } from 'src/app/shared/puntos';
import { Food } from 'src/app/shared/Snake/food';
import { outsideGrid } from 'src/app/shared/Snake/gameboard-grid.util';
import { Snake } from 'src/app/shared/Snake/snake';
import { Usuario } from 'src/app/shared/usuario';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.css']
})
export class SnakeComponent implements OnInit, AfterViewInit  {

  usuario: Usuario = new Usuario();
  public usuario$: Observable<any> = this.authService.afAuth.user;
  listaPuntajes: Array<Puntos> = new Array<Puntos>();
  listaOrdenada: Array<Puntos> = new Array<Puntos>();
  resultado: boolean = false;
  puntos!: number;
  puntosAux!: number;
  constructor(public router: Router, public authService: AuthService, public puntajeSvc: PuntajeService) {
    this.puntajeSvc.cargarPuntajesSnake();
    this.usuario$.subscribe((result: any) => {
      this.usuario.email = result['email'];
      this.usuario.id = result['uid']

    });
   }
  title = 'Snake';
  gameBoard: any;
  snake = new Snake();
  food = new Food(this.snake);


  lastRenderTime = 0
  gameOver = false

  ngAfterViewInit() {
    this.gameBoard = document.querySelector('.game-board');
    window.requestAnimationFrame(this.start.bind(this));
  }

  ngOnInit(): void {
    this.snake.listenToInputs();
    this.puntosAux = 0;
  }
  dpadMovement(direction: string) {
    this.snake.input.setDirection(direction);
  }


  start(currentTime: any) {
    if (this.gameOver) {
      return console.log('Game Over');
    }

    window.requestAnimationFrame(this.start.bind(this));
    const secondsSinceLastRender = (currentTime - this.lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / this.snakeSpeed) {
      return;
    }
    this.lastRenderTime = currentTime;

    this.update();
    this.draw();
  }

  update() {
    this.snake.update();
    this.food.update();
    this.checkDeath();
  }

  draw() {
    this.gameBoard.innerHTML = '';
    this.snake.draw(this.gameBoard);
    this.food.draw(this.gameBoard);
  }

  restart(){
    this.start
  }

  checkDeath() {
    this.gameOver = outsideGrid(this.snake.getSnakeHead()) || this.snake.snakeIntersection();
    if (!this.gameOver) {
      return;
    }
    this.gameBoard.classList.add('blur');
    this.puntosAux = this.food.currentScore;
    this.addPuntaje(this.usuario.id, this.usuario.email, this.puntosAux);
    this.cargarPuntajes();
  }


  get snakeSpeed() {
    const score = this.food.currentScore;
    if (score < 10) {
      return 4;
    }
    if (score > 10 && score < 15) {
      return 5;
    }
    if (score > 15 && score < 20) {
      return 6;
    }
    return 7;
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
    this.puntajeSvc.addPuntaje(usuarioId, usuario, puntaje, this.puntajeSvc.puntajesCollectionSnake);
  }
}

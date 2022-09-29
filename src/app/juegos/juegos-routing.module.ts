import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './ahorcado/ahorcado/ahorcado.component';
import { MayormenorComponent } from './mayormenor/mayormenor/mayormenor.component';
import { PreguntadosComponent } from './preguntados/preguntados/preguntados.component';
import { SnakeComponent } from './snake/snake.component';

const routes: Routes = [
  {path: 'mayormenor', component: MayormenorComponent},
  {path: 'ahorcado', component: AhorcadoComponent},
  {path: 'preguntados', component: PreguntadosComponent},
  {path: 'snake', component: SnakeComponent},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }

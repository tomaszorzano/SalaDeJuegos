import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './ahorcado/ahorcado/ahorcado.component';
import { MayormenorComponent } from './mayormenor/mayormenor/mayormenor.component';
import { PreguntadosComponent } from './preguntados/preguntados/preguntados.component';

const routes: Routes = [
  {path: 'mayormenor', component: MayormenorComponent},
  {path: 'ahorcado', component: AhorcadoComponent},
  {path: 'preguntados', component: PreguntadosComponent},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }

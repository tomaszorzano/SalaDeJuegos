import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { FormsModule } from '@angular/forms';
import { AhorcadoComponent } from './ahorcado/ahorcado/ahorcado.component';
import { MayormenorComponent } from './mayormenor/mayormenor/mayormenor.component';
import { PreguntadosComponent } from './preguntados/preguntados/preguntados.component';


@NgModule({
  declarations: [
    AhorcadoComponent,
    MayormenorComponent,
    PreguntadosComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    FormsModule
  ]
})
export class JuegosModule { }

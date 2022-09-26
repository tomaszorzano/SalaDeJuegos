import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './Components/chat/chat.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { QuienSoyComponent } from './Components/quien-soy/quien-soy.component';
import { RegisterComponent } from './Components/register/register.component';
import { JuegosModule } from './juegos/juegos.module';

const routes: Routes = [

  {path: 'Home',component:HomeComponent},
  {path:'', component:LoginComponent},
  {path: 'QuienSoy',component:QuienSoyComponent},
  {path: 'login',component:LoginComponent},
  {path: 'Register',component:RegisterComponent},
  {path: 'Chat',component:ChatComponent},
  {path: 'juegos', loadChildren: () => import('./juegos/juegos.module').then(m => JuegosModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

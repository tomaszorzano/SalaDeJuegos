import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { QuienSoyComponent } from './Components/quien-soy/quien-soy.component';

const routes: Routes = [

  {path: 'Home',component:HomeComponent},
  {path: 'QuienSoy',component:QuienSoyComponent},
  {path: 'login',component:LoginComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

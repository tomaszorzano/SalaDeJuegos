import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { LoginComponent } from './Components/login/login.component';
import { QuienSoyComponent } from './Components/quien-soy/quien-soy.component';
import { HomeComponent } from './Components/home/home.component';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from "@angular/fire/compat/database";
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { RegisterComponent } from './Components/register/register.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { ChatComponent } from './Components/chat/chat.component';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { EncuestaComponent } from './Components/encuesta/encuesta.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    QuienSoyComponent,
    HomeComponent,
    RegisterComponent,
    NavbarComponent,
    ChatComponent,
    EncuestaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    provideDatabase(() => getDatabase()),

  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase} ],
  bootstrap: [AppComponent]
})
export class AppModule { }

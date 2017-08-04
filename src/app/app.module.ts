import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

import { FormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

const firebaseConfig = {
  apiKey: "AIzaSyAne-QUmpNmE6xRNdVbbMlqC-nAGJmH5UI",
  authDomain: "imodernas-79ecf.firebaseapp.com",
  databaseURL: "https://imodernas-79ecf.firebaseio.com",
  projectId: "imodernas-79ecf",
  storageBucket: "imodernas-79ecf.appspot.com",
  messagingSenderId: "536466817651"
};

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(routes)
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

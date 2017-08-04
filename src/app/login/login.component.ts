import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: any;
  usernameText: string;
  usernameAvailable: boolean;

  constructor(public auth: AuthService, private router: Router) { }

  signInWithGoogle() {
    this.auth.googleLogin()
  }

  checkUsername() {
    this.auth.checkUsernamme(this.usernameText).subscribe(username => {
      this.usernameAvailable = !username.$value
    })
  }

  updateUsername() {
    this.auth.updateUsername(this.usernameText)
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from "../auth.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: any;
  usernameText: string;
  usernameAvailable: boolean;

  loginForm: FormGroup;
  userdata: any;

  mensaje = false;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router, private activatedRouter: ActivatedRoute) { }

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
    this.loginForm = this.formBuilder.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6)
      ]
      ]
    });
  }

  isAuth() {
    return this.auth.isAuthenticated();
  }

  onSubmit() {
    this.userdata = this.saveUserdata();
    this.auth.inicioSesion(this.userdata);
    setTimeout(() => {
      if (this.isAuth() === false) {
        this.mensaje = true
      }
    }, 1000);
  }

  saveUserdata() {

    const saveUserdata = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,

    };
    return saveUserdata;
  }

}

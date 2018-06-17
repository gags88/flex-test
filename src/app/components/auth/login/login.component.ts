import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  invalidAttempt: boolean;

  constructor() { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [Validators.required])
    });
  }

  get invalidEmailError() {
    return this.loginForm.controls['email'].hasError('required') ? 'Please provide your email address' :
      this.loginForm.controls['email'].hasError('pattern') ? 'This email address is not valid' :
        '';
  }

  get invalidPasswordError() {
    return this.loginForm.controls['password'].hasError('required') ? 'Please provide your password' : '';
  }

}

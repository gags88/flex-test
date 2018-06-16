import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  isRequestSubmitted: boolean;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  constructor() { }

  ngOnInit() {
    this.isRequestSubmitted = false;
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    });
  }

  onFormSubmit() {
    if (this.isFieldValid) {
      this.isRequestSubmitted = true;
    }
  }

  get invalidEmailError() {
    return this.forgotPasswordForm.controls['email'].hasError('required') ? 'Please provide your email address' :
      this.forgotPasswordForm.controls['email'].hasError('pattern') ? 'This email address is not valid' :
        '';
  }

  get isFieldValid() {
    return this.forgotPasswordForm.controls['email'].valid;
  }

}

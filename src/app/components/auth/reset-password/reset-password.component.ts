import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { matchOtherValidator } from '../../../validators/matchOtherValidator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required, matchOtherValidator('password')])
    });
  }

  onFormSubmit() {
    console.log(this.resetPasswordForm.controls['confirmPassword'].hasError('match'));
  }

  get invalidPasswordError() {
    return this.resetPasswordForm.controls['password'].hasError('required') ? 'Please provide new password' : '';
  }

  get invalidConfirmPasswordError() {
    let errorString: any;
    errorString = this.resetPasswordForm.controls['confirmPassword'].hasError('required') ?
      'Confirm password can not be blank' :
      this.resetPasswordForm.controls['confirmPassword'].hasError('match') ?
        'Confirm password do not match' : '';
    return errorString;
  }

}

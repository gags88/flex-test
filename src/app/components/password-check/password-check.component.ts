import { Component, OnInit, Input, OnChanges, SimpleChange, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-password-check',
  templateUrl: './password-check.component.html',
  styleUrls: ['./password-check.component.scss']
})
export class PasswordCheckComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  passwordToCheck: string;
  passwordRules: any;
  rulesVisible: boolean;
  passSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.passwordRules = [
      {
        key: 'minLength',
        value: 'Be atleast 8 characters long',
        flag: false
      },
      {
        key: 'number',
        value: 'Have at least one number',
        flag: false
      },
      {
        key: 'lowercase',
        value: 'Have at least lowercase alphabet',
        flag: false
      },
      {
        key: 'uppercase',
        value: 'Have at least one uppercase alphabet',
        flag: false
      },
      {
        key: 'special_character',
        value: 'Have at least one special character',
        flag: false
      }
    ];
  }

  private measureStrength(p) {

    const lowercase = /[a-z]+/.test(p);
    const uppercase = /[A-Z]+/.test(p);
    const number = /[0-9]+/.test(p);
    const _regex = /[$*@!#%&()^~{}]+/;
    const special_character = _regex.test(p);
    const minLength = p.length >= 8;

    const _flags = [minLength, number, lowercase, uppercase, special_character];

    this.passwordRules[0].flag = _flags[0] === true ? true : false;
    this.passwordRules[1].flag = _flags[1] === true ? true : false;
    this.passwordRules[2].flag = _flags[2] === true ? true : false;
    this.passwordRules[3].flag = _flags[3] === true ? true : false;
    this.passwordRules[4].flag = _flags[4] === true ? true : false;
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    const password = changes['passwordToCheck'].currentValue;
    this.passSubscription = password.valueChanges.subscribe(val => {
      this.rulesVisible = val.length !== 0 ? true : false;
      this.measureStrength(val);
    });
  }

  ngOnDestroy(): void {
    this.passSubscription.unsubscribe();
  }

}

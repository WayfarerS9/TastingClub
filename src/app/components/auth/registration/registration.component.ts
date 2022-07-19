import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { IUserRegistration } from 'src/app/models/user.model';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  availableDateOfBirth?: Date;

  regForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, [
      Validators.required,
      this.justSpaceValidator,
    ]),
    lastName: new FormControl(null, [
      Validators.required,
      this.justSpaceValidator,
    ]),
    birthday: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
    passwordConfirm: new FormControl(null, [
      Validators.required,
      this.passwordValidator,
    ]),
  });

  constructor(private _registrationService: RegistrationService) {}

  ngOnInit(): void {
    this.availableDateOfBirth = new Date(
      String(moment().subtract(18, 'years').subtract(1, 'days'))
    );
  }

  passwordValidator(control: FormControl): { [s: string]: boolean } | null {
    if (
      control.parent?.get('password')?.value !==
      control.parent?.get('passwordConfirm')?.value
    ) {
      return { mismatchPasswordConfirm: true };
    }
    return null;
  }

  justSpaceValidator(control: FormControl): { [s: string]: boolean } | null {
    if (!control.value?.trimStart()) {
      return { justSpaces: true };
    }
    return null;
  }

  updateValidation() {
    this.regForm.get('passwordConfirm')?.updateValueAndValidity();
  }

  registerUser() {
    let regModel = Object.assign({}, this.regForm.value);
    delete regModel.passwordConfirm;
    this._registrationService.registerUser(regModel as IUserRegistration)
      .subscribe( res => {

        // if TOTKEN get, localStorage.setItem('TOKEN', JSON.stringify(jwtResponse));
        // else - error
        console.log(res)
      })    
  }
}

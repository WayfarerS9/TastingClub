import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { IUserRegistration } from 'src/app/models/user.model';
// import { RegistrationService } from 'src/app/services/registration.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  availableDateOfBirth?: Date;
  hidePassword = true;
  hideRepeatPassword = true;

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

  constructor(
    // private _registrationService: RegistrationService,
    private _auth: AuthService,
    private _toastrService: ToastrService
  ) {}

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
    this._auth
      .registerUser(regModel as IUserRegistration)
      .subscribe(
        (res: any) => {
          this._toastrService.success(res.message);

          if (res.token) {
            localStorage.setItem('TOKEN_TASTYCLUB', res.token);
          }

          if (res.user) {
            localStorage.setItem('USER_TASTYCLUB', JSON.stringify(res.user));
          }
        },
        (error) => {
          this._toastrService.error(error.error.message);
        }
      );
  }
}

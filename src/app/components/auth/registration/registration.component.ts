import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { IUserRegistration } from 'src/app/models/user.model';
import { Router } from '@angular/router';
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

  regForm: UntypedFormGroup = new UntypedFormGroup({
    firstName: new UntypedFormControl(null, Validators.required),
    lastName: new UntypedFormControl(null, Validators.required),
    birthday: new UntypedFormControl(null, Validators.required),
    email: new UntypedFormControl(null, [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]+$")]),
    password: new UntypedFormControl(null, [Validators.required, Validators.maxLength(20)]),
    passwordConfirm: new UntypedFormControl(null, [
      Validators.required,
      this.passwordValidator,
    ]),
  });

  constructor(
    // private _registrationService: RegistrationService,
    private _auth: AuthService,
    private _toastrService: ToastrService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.availableDateOfBirth = new Date(
      String(moment().subtract(18, 'years').subtract(1, 'days'))
    );
  }

  passwordValidator(control: UntypedFormControl): { [s: string]: boolean } | null {
    if (
      control.parent?.get('password')?.value !==
      control.parent?.get('passwordConfirm')?.value
    ) {
      return { mismatchPasswordConfirm: true };
    }
    return null;
  }

  updateValidation() {
    this.regForm.get('passwordConfirm')?.updateValueAndValidity();
  }

  registerUser() {
    let regModel = Object.assign({}, this.regForm.value);
    delete regModel.passwordConfirm;
    this._auth.registerUser(regModel as IUserRegistration).subscribe(
      (res: any) => {
        this._toastrService.success(res.message);

        if (res.token) {
          localStorage.setItem('TOKEN_TASTYCLUB', res.token);
        }

        if (res.user) {
          localStorage.setItem('USER_TASTYCLUB', JSON.stringify(res.user));
        }

        this._router.navigate(['home']);
      },
      (error) => {
        this.regForm.controls['email'].setErrors({ notUnique: true || false });
        this._toastrService.error(error.error.message);
      }
    );
  }
}

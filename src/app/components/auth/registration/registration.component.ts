import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  regForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    birthday: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]+$")]),
    password: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
    passwordConfirm: new FormControl(null, [
      Validators.required,
      this.passwordValidator,
    ]),
  });

  constructor(
    private _auth: AuthService,
    private _toastrService: ToastrService,
    private _router: Router
  ) { }

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

  updateValidation() {
    this.regForm.get('passwordConfirm')?.updateValueAndValidity();
  }

  registerUser() {
    let regModel = Object.assign({}, this.regForm.value);
    delete regModel.passwordConfirm;

    this._auth.registerUser(regModel as IUserRegistration).subscribe({
      next: (res: any) => {
        this._toastrService.success(res.message);

        if(res.token && res.refresh && res.user) {
          this._auth.passInformationToLocalStorage(res.token, res.refresh, res.user);
        }

        this._auth.userChanges();
        this._router.navigate(['home']);
      },

      error: (error) => {
        this._toastrService.error(error.error.message);
      }
    });
  }
}

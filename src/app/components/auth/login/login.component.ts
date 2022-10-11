import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUserSignIn } from 'src/app/models/user.model';
// import { LoginService } from 'src/app/services/login.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hidePassword = true;

  logForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]+$")]),
    password: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
  });

  constructor(
    // private _loginService: LoginService,
    private _auth: AuthService,
    private _toastrService: ToastrService,
    private _router: Router
  ) { }

  ngOnInit(): void { }

  signInUser() {
    let logModel = Object.assign({}, this.logForm.value);
    this._auth.signInUser(logModel as IUserSignIn).subscribe({
      next: (res: any) => {
        console.log(res)
        this._toastrService.success(res.message);

        if (res.token && res.refresh) {
          let TOKEN = {
            token: res.token,
            refresh: res.refresh,
          }
          
          localStorage.setItem('TOKEN_TASTYCLUB', JSON.stringify(TOKEN));
        }

        if (res.user) {
          localStorage.setItem('USER_TASTYCLUB', JSON.stringify(res.user));
        }

        this._router.navigate(['home']);
      },
      error: (error) => {
        this._toastrService.error(error.error.message);
      }
    });
  }
}

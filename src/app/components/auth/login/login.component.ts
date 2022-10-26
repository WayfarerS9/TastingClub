import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUserSignIn } from 'src/app/models/user.model';
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
    private _auth: AuthService,
    private _toastrService: ToastrService,
    private _router: Router
  ) { }

  ngOnInit(): void { }

  signInUser() {
    let logModel = Object.assign({}, this.logForm.value);
    this._auth.signInUser(logModel as IUserSignIn).subscribe({
      next: (res: any) => {
        this._toastrService.success(res.message);

        if(res.token && res.refresh && res.user) {
          this._auth.passInformationToLocalStorage(res.token, res.refresh, res.user);
        }

        this._auth.userChanges()
        this._router.navigate(['home']);
      },
      error: (error) => {
        this._toastrService.error(error.error.message);
      }
    });
  }
}

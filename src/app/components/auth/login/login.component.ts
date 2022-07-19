import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUserSignIn } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hidePassword = true;
  
  logForm: FormGroup = new FormGroup({    
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),    
  });

  constructor(
    private _loginService: LoginService,
    private _toastrService: ToastrService
    ) { }


  ngOnInit(): void {
  }

  signInUser() {
    let logModel = Object.assign({}, this.logForm.value);
    this._loginService.signInUser(logModel as IUserSignIn)
      .subscribe( (res: any) => {
        this._toastrService.success(res.message);
  
        if (res.token) {
          localStorage.setItem('TOKEN_TASTYCLUB', res.token);
        }
  
        if (res.user) {
          localStorage.setItem('USER_TASTYCLUB', JSON.stringify(res.user));
        }
      },
      (error) => {
        this._toastrService.error(error);
      }) 
  }

}

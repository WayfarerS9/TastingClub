import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUserSignIn } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  logForm: FormGroup = new FormGroup({    
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),    
  });

  constructor(private _loginService: LoginService) { }

  ngOnInit(): void {
  }

  loginUser() {

  }

  signInUser() {
    let logModel = Object.assign({}, this.logForm.value);
    this._loginService.signInUser(logModel as IUserSignIn)
      .subscribe( res => {
                // if TOTKEN get, localStorage.setItem('TOKEN', JSON.stringify(jwtResponse));
                // else - error
        console.log(res)
      })    
  }

}

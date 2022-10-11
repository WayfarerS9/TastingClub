import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUserRegistration, IUserSignIn } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _http: HttpClient,
    private _router: Router
  ) {}

  registerUser(model: IUserRegistration) {
    return this._http.post(environment.apiUrl + '/auth/registration', model);
  }

  signInUser(model: IUserSignIn) {
    return this._http.post(environment.apiUrl + '/auth/signIn', model);
  }

  logOut() {
    localStorage.removeItem('USER_TASTYCLUB');
    localStorage.removeItem('TOKEN_TASTYCLUB');
    this._router.navigate(['/auth/login']);
  }
}

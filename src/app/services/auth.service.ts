import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUserRegistration, IUserSignIn, IUserWithAdditionalInf } from '../models/user.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userInformation: IUserWithAdditionalInf | null = this.getUserInformation();
  userChanges$ = new Subject<IUserWithAdditionalInf | null>();

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  getUserInformation(): IUserWithAdditionalInf | null {
    let userString = localStorage.getItem('USER_TASTYCLUB');
    return userString ? JSON.parse(userString) : null;
  }

  userChanges() {
    this.userInformation = this.getUserInformation()
    this.userChanges$.next(this.userInformation)
  }

  registerUser(model: IUserRegistration) {
    return this._http.post(environment.apiUrl + '/auth/registration', model);
  }

  signInUser(model: IUserSignIn) {    
    return this._http.post(environment.apiUrl + '/auth/signIn', model);
  }

  passInformationToLocalStorage(token: any, refresh: any, user: any) {
      let TOKEN = {
        token,
        refresh,
      }
      
      localStorage.setItem('TOKEN_TASTYCLUB', JSON.stringify(TOKEN));
      localStorage.setItem('USER_TASTYCLUB', JSON.stringify(user));
  }

  logOut() {
    localStorage.removeItem('USER_TASTYCLUB');
    localStorage.removeItem('TOKEN_TASTYCLUB');
    this.userChanges$.next(null);
    this._router.navigate(['/auth/login']);
  }
}

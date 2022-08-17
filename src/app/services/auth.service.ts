import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUserRegistration, IUserSignIn } from '../models/user.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  registerUser(model: IUserRegistration) {
    return this._http.post(environment.apiUrl + '/auth/signup', model);
  }

  signInUser(model: IUserSignIn) {
    return this._http.post(environment.apiUrl + '/auth/signin', model).pipe(
      map((data) => {
        return data;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}

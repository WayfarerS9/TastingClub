import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUserWithAdditionalInf } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http: HttpClient) { }

  getBySearch(term: string) {
    return this._http.get<IUserWithAdditionalInf[]>(environment.apiUrl + `/users/getBySearch?term=${term}`)
  }
}

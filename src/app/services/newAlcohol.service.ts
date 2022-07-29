import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { INewDrink } from '../models/alcohol.model';

@Injectable({
  providedIn: 'root',
})
export class AlcoholService {
  constructor(private _http: HttpClient) {}

  newAlcohol(model: INewDrink) {
    return this._http.post(environment.apiUrl + '/add-new-alcohol', model);
  }

  getAlcohol() {
    return this._http.get(environment.apiUrl + '/get-alcohol');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NewAlcohol } from '../models/alcohol.model';

@Injectable({
  providedIn: 'root',
})
export class AlcoholService {
  constructor(private _http: HttpClient) {}

  newAlcohol(model: NewAlcohol) {
    return this._http.post(environment.apiUrl + '/add-new-alcohol', model);
  }

  getAlcohol(model: NewAlcohol) {
    return this._http.post(environment.apiUrl + '/get-alcohol', model);
  }
}

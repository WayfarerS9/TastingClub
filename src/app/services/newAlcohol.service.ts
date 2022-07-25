import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewAlcohol } from '../models/alcohol.model';

export class AlcoholService {
  constructor(private _http: HttpClient) {}

  newAlcohol(model: NewAlcohol) {
    console.log(model)
    return this._http.post(environment.apiUrl + '/add-new-alcohol', model);
  }
}

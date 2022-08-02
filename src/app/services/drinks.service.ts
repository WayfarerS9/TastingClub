import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DrinksService {

  constructor(
    private _http: HttpClient
  ) { }


  searchDrinks(term: string) {
    return this._http.get(environment.apiUrl + `/search/${term}`);
  }




}

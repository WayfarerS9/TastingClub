import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DrinksService {
  constructor(private _http: HttpClient) { }

  searchByCategoryDrinks(term: string) {
    return this._http.get(environment.apiUrl + `/get-by-category/${term}`);
  }

  searchByIdDrinks(term: any) {
    return this._http.get(environment.apiUrl + `/get-by-id/${term.id}`);
  }


  ratingAndReview(term: any) {
    console.log(term)
    return this._http.post(environment.apiUrl + `/update/${term.id}`, {
      userId: term.id,
      rating: term.rating,
      feedBack: term.feedBack,
      dateOfDegustation: term.dateOfDegustation
    });
  }

}

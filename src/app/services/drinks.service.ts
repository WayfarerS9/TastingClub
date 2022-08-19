import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IDeleteDrink } from '../models/alcohol.model';
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

  getShortInfoAboutDrink(term: any) {
    return this._http.get(
      environment.apiUrl + `/get-short-info?userId=${term}`
    );
  }

  ratingAndReview(term: any) {
    return this._http.put(environment.apiUrl + `/update/${term.userId}`, {
      firstName: term.firstName,
      userId: term.userId,
      mongoId: term.mongoId,
      rating: term.rating,
      feedBack: term.feedBack,
      dateOfDegustation: term.dateOfDegustation,
    });
  }

  deleteDrink(term: IDeleteDrink) {
    return this._http.delete(environment.apiUrl + `/delete-drink?userId=${term.userId}&mongoId=${term.mongoId}`)
  }
}

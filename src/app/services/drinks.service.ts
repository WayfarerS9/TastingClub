import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICreationModelDrink, IDeleteDrink, IDeleteReview, ITastedDrinkCreateReview } from '../models/alcohol.model';
@Injectable({
  providedIn: 'root',
})
export class DrinksService {
  constructor(private _http: HttpClient) { }

  getBySearch(term: string) {
    return this._http.get(environment.apiUrl + `/drinks/getBySearch?crt=${term}`);
  }

  getById(drinkId: string, userId: string) {
    return this._http.get(environment.apiUrl + `/drinks/getById?drinkId=${drinkId}&userId=${userId}`)
  }

  postReview(tastedDrink: ITastedDrinkCreateReview) {
    return this._http.post(environment.apiUrl + `/drinks/postReview`, tastedDrink)
  }

  putReview(tastedDrink: ITastedDrinkCreateReview) {
    return this._http.put(environment.apiUrl + `/drinks/putReview`, tastedDrink)
  }

  getAllByUserId(id: string) {
    return this._http.get(environment.apiUrl + `/drinks/getAllByUserId?id=${id}`)
  }

  getTastedById(userId: string, drinkId: string) {
    return this._http.get(environment.apiUrl + `/drinks/getTastedById?userId=${userId}&drinkId=${drinkId}`)
  }

  create(createDrinkModel: ICreationModelDrink) {
    return this._http.post(environment.apiUrl + `/drinks/create`, createDrinkModel)
  }
































  











  searchByCategoryDrinks(term: string) {
    return this._http.get(environment.apiUrl + `/get-by-category/${term}`);
  }

  searchByIdDrinks(term: any) {
    return this._http.get(environment.apiUrl + `/get-by-id/${term.id}`);
  }

  getShortInfoAboutDrink(term: any, search?: any) {
    return this._http.get(
      environment.apiUrl + `/get-short-info?userId=${term}&name=${search}&typeOfDrink=${search}&region=${search}&strength=${search}`
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

  deleteReview(term: IDeleteReview) {
    return this._http.delete(environment.apiUrl + `/delete-review?userId=${term.userId}&mongoId=${term.mongoId}`)
  }
}

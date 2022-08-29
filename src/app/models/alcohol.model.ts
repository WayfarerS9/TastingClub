//Model for show drink
export interface IMyDrinksShort {
  _id: string;
  name: string;
  rating: number;
}
//Model for creating new drink
export interface INewDrink {
  typeName: string;
  categoryName: string;
  produced: string;
  drinkName: string;
  userName: string;
  userId: number;
}
export interface ICategoryOfType {
  _id: string;
  typeId: number;
  categoryName: string;
}
//Model for show info about drink in cards
export interface IDrinkShort {
  _id: string;
  name: string;
  typeOfDrink: string;
  region: string;
  strength: number;
  category?: Array<string>;
  type?: string;
  /* добавил сюда поле рейтинг */
  rating: number;
  /* добавил сюда поле фидбэк */
  feedBack: string;
  /* добавил сюда поле image */
  image: string;
}
export interface IDrinkFull extends IDrinkShort {
  volume: number;
  manufacturer: string;
  grape?: Array<string>;
  filtration?: string;
}
//Model for show drink info in list
export class drinkFull implements IDrinkFull {
  _id = '';
  /* и сдесь добавил поле рейтинг со значением 0 */
  rating = 0;
  name = '';
  typeOfDrink = '';
  region = '';
  strength = 0;
  volume = 0;
  manufacturer = '';
  /* и сдесь добавил поле фидбэк */
  feedBack = '';
  image = '';
}
//Model for when user tasted drink
export interface ITastedDrinkFull extends IDrinkFull {
  userId: number;
  mongoId: string;
  dateOfDegustation: string;
  rating: number;
  feedBack: string;
}

export interface IDrinkForShow {
  id: string;
  title: string;
  /* добавлены четыре новых поля name, rating, feedBack*/
  type: string;
  name: string;
  rating: number;
  feedBack: string;
  image: string;
}
//Model for update drink
export interface IAddUpdateFeedBack {
  firstName: string;
  userId: number;
  mongoId: string;
  dateOfDegustation: string;
  rating: number;
  feedBack: string;
}

//Model for delete drink
export interface IDeleteDrink {
  userId: number,
  mongoId: string | undefined
}

export interface IDeleteReview {
  userId: number,
  mongoId: string | undefined
}
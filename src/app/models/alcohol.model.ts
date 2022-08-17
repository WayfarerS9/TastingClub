export interface IMyDrinksShort {
  _id: string;
  name: string;
  rating: number;
}
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
}
export interface IDrinkFull extends IDrinkShort {
  volume: number;
  manufacturer: string;
  grape?: Array<string>;
  filtration?: string;
}
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
}
export interface ITastedDrinkFull extends IDrinkFull {
  userId: number;
  mongoId: string;
  dateOfDegustation: string;
  rating: number;
  feedBack: string;
}

/* export class tastedDrinkFullWithFeedBack implements ITastedDrinkFullWithFeedBack {
  id = '';
  name = '';
  typeOfDrink = '';
  region = '';
  strength = 0;  
  volume = 0;
  manufacturer = '';
  userId = 0;
  dateOfDegustation = '';
  points = 0;
  feedBack = '';
} */

export interface IDrinkForShow {
  id: string;
  title: string;
  /* добавлены четыре новых поля name, rating, feedBack*/
  type: string;
  name: string;
  rating: number;
  feedBack: string;
}
export interface IAddUpdateFeedBack {
  firstName: string;
  userId: number;
  mongoId: string;
  dateOfDegustation: string;
  rating: number;
  feedBack: string;
}

export interface IDrinkShortInfo {
  _id: string;
  name: string;
  typeOfDrink: string;
  region: string;
  strength: number;
  category?: Array<string>;
  type?: string;
  volume: number;
  manufacturer: string;
  grape?: Array<string>;
  filtration?: string;
  userId: number;
  mongoId: string;
  dateOfDegustation: string;
  rating: number;
  feedBack: string;
}
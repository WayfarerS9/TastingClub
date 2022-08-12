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
}
export interface IDrinkFull extends IDrinkShort {
  volume: number;
  manufacturer: string;
  grape?: Array<string>;
  filtration?: string;
}
export class drinkFull implements IDrinkFull {
  _id = '';
  name = '';
  typeOfDrink = '';
  region = '';
  strength = 0;
  volume = 0;
  manufacturer = '';
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
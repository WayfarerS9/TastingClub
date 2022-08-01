export interface IMyDrinksShort {
  id: number;
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
  id: number,
  typeId: number,
  categoryName: string
}

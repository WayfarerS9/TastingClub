export interface INewDrink {
  typeId: number;
  typeName: string;
  categoryId: number;
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

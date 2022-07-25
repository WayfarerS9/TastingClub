export interface Wines {
  typeOfWine: TypeOfWine[];
  wineName: WineName[];
  produced: Produced[];
}

export interface TypeOfWine {
  value: string;
  viewValue: string;
}

export interface WineName {
  value: string;
  viewValue: string;
}

export interface Produced {
  value: string;
  viewValue: string;
}

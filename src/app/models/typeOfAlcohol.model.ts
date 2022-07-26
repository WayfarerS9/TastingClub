export interface TypeOfAlcohol {
  name: any;
  children?: TypeOfAlcohol[];
  id: number;
}

/** Flat node with expandable and level information */
export interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  id: number;
}

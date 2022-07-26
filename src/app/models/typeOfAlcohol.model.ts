export interface TypeOfAlcohol {
  name: string;
  children?: TypeOfAlcohol[];
  id: any;
}

/** Flat node with expandable and level information */
export interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  id: any;
}

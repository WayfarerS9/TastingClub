export interface TypeOfAlcohol {
  name: string;
  children?: TypeOfAlcohol[];
  id: number;
  expanded?: boolean
}

/** Flat node with expandable and level information */
export interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  id: number;
}

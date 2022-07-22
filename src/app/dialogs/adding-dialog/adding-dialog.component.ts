import { Component, Inject, OnInit } from '@angular/core';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

interface TypeOfWine {
  value: string;
  viewValue: string;
}

interface WineName {
  value: string;
  viewValue: string;
}

interface Produced {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-adding-dialog',
  templateUrl: './adding-dialog.component.html',
  styleUrls: ['./adding-dialog.component.scss'],
})
export class AddingDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public _dialog: MatDialog
  ) {}

  selectedValue?: string;
  selectedWineName?: string;
  selectedProduced?: string;

  typeOfWine: TypeOfWine[] = [
    { value: 'red semi-sweet', viewValue: 'red semi-sweet' },
    { value: 'white dry', viewValue: 'white dry' },
    { value: 'red semi-dry', viewValue: 'red semi-dry' },
  ];

  wineName: WineName[] = [
    { value: 'Cabernet Sauvignon', viewValue: 'Cabernet Sauvignon' },
    { value: 'Merlot', viewValue: 'Merlot' },
    { value: 'Pinot Noir', viewValue: 'Pinot Noir' },
  ];

  produced: Produced[] = [
    { value: 'France', viewValue: 'France' },
    { value: 'Italy', viewValue: 'Italy' },
    { value: 'Georgia', viewValue: 'Georgia' },
  ];

  openDialog(): void {
    this._dialog.open(AddingDialogComponent, {
      width: '200px',
    });
  }
  ngOnInit(): void {}
}

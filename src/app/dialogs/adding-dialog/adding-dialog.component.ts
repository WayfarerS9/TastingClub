import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Wines } from './../../interface/wine.interface';
import { AlcoholService } from 'src/app/services/newAlcohol.service';
import { NewAlcohol } from 'src/app/models/alcohol.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
interface TypeOfWine {
  value: string;
  viewValue: string;
}

interface Category {
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
    public _dialog: MatDialog,
    private _fb: FormBuilder,
    private _alcoholService: AlcoholService,
    private _toastrService: ToastrService,
    private _router: Router
  ) {}

  selectedType?: string;
  selectedWineName?: string;
  selectedProduced?: string;
  newUser = '';

  newWineForm = this._fb.group({
    type: new FormControl('', [Validators.required]),
    nameOfAlcohol: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    produced: new FormControl('', [Validators.required]),
    // comment: new FormControl('', [Validators.required]),
  });

  typeOfWine: TypeOfWine[] = [
    { value: 'Wines', viewValue: 'Wines' },
    { value: 'Whisky', viewValue: 'Whisky' },
    { value: 'Vodka', viewValue: 'Vodka' },
    { value: 'Rom', viewValue: 'Rom' },
    { value: 'Tequila', viewValue: 'Tequila' },
    { value: 'Cognac', viewValue: 'Cognac' },
    { value: 'Liquor', viewValue: 'Liquor' },
    { value: 'Champagne', viewValue: 'Champagne' },
  ];

  category: Category[] = [];

  openDialog(): void {
    this._dialog.open(AddingDialogComponent, {
      width: '200px',
    });
  }

  addNewWine() {
    this.newUser = this.newWineForm.value;
    this._alcoholService
      .newAlcohol(this.newUser as unknown as NewAlcohol)
      .subscribe(
        (res: any) => {
          this._toastrService.success(res.message);
          this._router.navigate(['home']);
        },
        (error) => {
          this._toastrService.error(error.error.message);
        }
      );
  }
  ngOnInit(): void {}
}

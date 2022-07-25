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
    public _dialog: MatDialog,
    private _fb: FormBuilder
  ) {}

  selectedType?: string;
  selectedWineName?: string;
  selectedProduced?: string;
  newUser = '';

  newWineForm = this._fb.group({
    userName: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    nameOfAlcohol: new FormControl('', [Validators.required]),
    alcoholContent: new FormControl('', [Validators.required]),
    produced: new FormControl('', [Validators.required]),
    // comment: new FormControl('', [Validators.required]),
  });

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

  addNewWine() {
    this.newUser = this.newWineForm.value;
    console.log(this.newUser);
    // this._auth.registerUser(regModel as IUserRegistration).subscribe(
    //   (res: any) => {
    //     this._toastrService.success(res.message);

    //     if (res.token) {
    //       localStorage.setItem('TOKEN_TASTYCLUB', res.token);
    //     }

    //     if (res.user) {
    //       localStorage.setItem('USER_TASTYCLUB', JSON.stringify(res.user));
    //     }

    //     this._router.navigate(['home']);
    //   },
    //   (error) => {
    //     this.regForm.controls['email'].setErrors({ notUnique: true || false });
    //     this._toastrService.error(error.error.message);
    //   }
    // );
  }
  ngOnInit(): void {}
}

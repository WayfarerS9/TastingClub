import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlcoholService } from 'src/app/services/newAlcohol.service';
import { INewDrink, ICategoryOfType } from 'src/app/models/alcohol.model';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
interface ITypeOfAlcohol {
  id: number;
  typeName: string;
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
    private _toastrService: ToastrService
  ) {}

  user = JSON.parse(localStorage.getItem('USER_TASTYCLUB')!);
  selectedWineName?: string;
  selectedProduced?: string;
  newDrink!: INewDrink;
  validCategories?: ICategoryOfType[];
  filteredValidCategories?: ICategoryOfType[];
  subscriptionForMatAutocomplete = new Subject<string>();

  newDrinkForm = this._fb.group({
    typeId: new FormControl(''),
    typeName: new FormControl('', [Validators.required]),
    categoryId: new FormControl(''),
    categoryName: new FormControl('', [Validators.required]),
    produced: new FormControl('', [Validators.required]),
    drinkName: new FormControl('', [Validators.required]),
    userName: new FormControl(this.user.firstName),
    userId: new FormControl(this.user.id),
    // comment: new FormControl('', [Validators.required]),
  });

  typesOfAlcohol: ITypeOfAlcohol[] = [
    { id: 1, typeName: 'Wines' },
    { id: 2, typeName: 'Whisky' },
    { id: 3, typeName: 'Vodka' },
    { id: 4, typeName: 'Rom' },
    { id: 5, typeName: 'Tequila' },
    { id: 6, typeName: 'Cognac' },
    { id: 7, typeName: 'Liquor' },
    { id: 8, typeName: 'Champagne' },
  ];

  typesOfCategory: ICategoryOfType[] = [
    { _id: '', typeId: 1, categoryName: 'red' },
    { _id: '', typeId: 1, categoryName: 'white' },
    { _id: '', typeId: 2, categoryName: 'bourbon' },
    { _id: '', typeId: 2, categoryName: 'samogon' },
    { _id: '', typeId: 3, categoryName: 'anis' },
    { _id: '', typeId: 3, categoryName: 'grappa' },
    { _id: '', typeId: 4, categoryName: 'black' },
    { _id: '', typeId: 4, categoryName: 'white' },
    { _id: '', typeId: 5, categoryName: 'silver' },
    { _id: '', typeId: 5, categoryName: 'gold' },
    { _id: '', typeId: 6, categoryName: 'sixYear' },
    { _id: '', typeId: 6, categoryName: 'sevenYear' },
    { _id: '', typeId: 7, categoryName: 'sweet' },
    { _id: '', typeId: 7, categoryName: 'white' },
  ];

  openDialog(): void {
    this._dialog.open(AddingDialogComponent, {
      width: '200px',
    });
  }

  addDrink() {
    let modelForAddDrinkDraft: any = {};
    Object.assign(modelForAddDrinkDraft, this.newDrinkForm.value);

    modelForAddDrinkDraft.typeName = modelForAddDrinkDraft.typeName.typeName;

    if (typeof modelForAddDrinkDraft.categoryName !== 'string') {
      modelForAddDrinkDraft.categoryId = modelForAddDrinkDraft.categoryName.id;
      modelForAddDrinkDraft.categoryName =
        modelForAddDrinkDraft.categoryName.categoryName;
    }

    this._alcoholService
      .newAlcohol(modelForAddDrinkDraft as INewDrink)
      .subscribe(
        (res: any) => {
          this._toastrService.success(res.message);
        },
        (error) => {
          this._toastrService.error(error.error.message);
        }
      );
  }

  setTypeId(ev: any) {
    this.newDrinkForm.patchValue({ typeId: ev.id });
    this.validCategories = this.typesOfCategory.filter(
      (category) => category.typeId === ev.id
    );
  }

  ngOnInit(): void {
    this.subscriptionForMatAutocomplete.subscribe((res) => {
      this.filterForAutocomplete(res);
    });
  }

  getOptions(event: any) {
    this.subscriptionForMatAutocomplete.next(event.target.value);
  }

  getOptionsIfFocus(value: string) {
    this.subscriptionForMatAutocomplete.next(value);
  }

  displayFn(category: ICategoryOfType): string {
    return category && category.categoryName ? category.categoryName : '';
  }

  filterForAutocomplete(criteria: string): void {
    if (this.newDrinkForm.get('typeName')!.value) {
      let filterValue = criteria.toLowerCase();
      this.filteredValidCategories = this.validCategories!.filter((option) => {
        return option.categoryName.toLowerCase().includes(filterValue);
      });
    }
  }
}

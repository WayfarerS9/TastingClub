import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { AlcoholService } from 'src/app/services/newAlcohol.service';
import { INewDrink, ICategoryOfType } from 'src/app/models/alcohol.model';
import { ToastrService } from 'ngx-toastr';

import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
interface ITypeOfAlcohol {
  id: number,
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
    private _toastrService: ToastrService,
  ) {}

  user = JSON.parse(localStorage.getItem('USER_TASTYCLUB')!)
  selectedWineName?: string;
  selectedProduced?: string;
  newDrink!: INewDrink;
  validCategories?: ICategoryOfType[];
  filteredValidCategories?: ICategoryOfType[];
  subscriptionForMatAutocomplete!: Subscription;


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


  observableForMatAutocomplete: Observable<ICategoryOfType[] | undefined>  = this.newDrinkForm.get('categoryName')!.valueChanges
    .pipe(
      startWith(''),
      map(value => {
        let name = typeof value === 'string' ? value : value.categoryName;      
        return name ? this._filter(name as string) : this.validCategories?.slice();
      }),
    )

  typesOfAlcohol: ITypeOfAlcohol[] = [
    { id: 1, typeName: 'Wines'},
    { id: 2, typeName: 'Whisky'},
    { id: 3, typeName: 'Vodka'},
    { id: 4, typeName: 'Rom'},
    { id: 5, typeName: 'Tequila'},
    { id: 6, typeName: 'Cognac'},
    { id: 7, typeName: 'Liquor'},
    { id: 8, typeName: 'Champagne'},
  ];

  typesOfCategory: ICategoryOfType[] = [
    { id: 1, typeId: 1, categoryName: 'red'},
    { id: 2, typeId: 1, categoryName: 'white'},
    { id: 3, typeId: 2, categoryName: 'bourbon'},
    { id: 4, typeId: 2, categoryName: 'samogon'},
    { id: 5, typeId: 3, categoryName: 'anis'},
    { id: 6, typeId: 3, categoryName: 'grappa'},
    { id: 7, typeId: 4, categoryName: 'black'},
    { id: 8, typeId: 4, categoryName: 'white'},
    { id: 9, typeId: 5, categoryName: 'silver'},
    { id: 10, typeId: 5, categoryName: 'gold'},
    { id: 11, typeId: 6, categoryName: 'sixYear'},
    { id: 12, typeId: 6, categoryName: 'sevenYear'},
    { id: 13, typeId: 7, categoryName: 'sweet'},
    { id: 14, typeId: 7, categoryName: 'white'},
  ]

  openDialog(): void {
    this._dialog.open(AddingDialogComponent, {
      width: '200px',
    });
  }

  addDrink() {
    
    if(typeof this.newDrinkForm.get('categoryName')!.value !== 'string') {
      this.newDrinkForm.patchValue({ categoryId: this.newDrinkForm.get('categoryName')!.value.id })
    }
    


/*     this.newDrink = this.newDrinkForm.value;
    this._alcoholService
      .newAlcohol(this.newDrink as INewDrink)
      .subscribe(
        (res: any) => {
          this._toastrService.success(res.message);
        },
        (error) => {
          this._toastrService.error(error.error.message);
        }
      ); */
      console.log(this.newDrinkForm.value)
  }

  setTypeId(ev: any) {
    this.newDrinkForm.patchValue({ typeId: ev.id })
    this.validCategories = this.typesOfCategory.filter( category => category.typeId === ev.id)
  }

  ngOnInit(): void {
  }

  subscribeForAutocomplete() {    
      this.subscriptionForMatAutocomplete = this.observableForMatAutocomplete.subscribe( res => {    
        this.filteredValidCategories = res as ICategoryOfType[]
      })     
  }

  unSubscribeForAutocomplete() {
    this.subscriptionForMatAutocomplete.unsubscribe()
  }

  displayFn(category: ICategoryOfType): string {
    return category && category.categoryName ? category.categoryName : '';
  }

  private _filter(name: string): ICategoryOfType[] {
    let filterValue = name.toLowerCase();
    return this.validCategories!.filter(option => {
      return option.categoryName.toLowerCase().includes(filterValue)
    });
  }
}

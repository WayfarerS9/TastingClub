import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  AfterContentInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  IChosenDrink,
  ITastedDrinkCreateReview,
} from 'src/app/models/alcohol.model';
import { DrinksService } from 'src/app/services/drinks.service';

@Component({
  selector: 'app-edit-drink',
  templateUrl: './edit-drink.component.html',
  styleUrls: ['./edit-drink.component.scss'],
})
export class EditDrinkComponent implements OnInit, AfterContentInit {
  @Output() onReturnToMyDrinks: EventEmitter<any> = new EventEmitter();
  @Input() drinkForAddingToStack!:
    | IChosenDrink
    | ITastedDrinkCreateReview
    | undefined;

  isEdit: boolean = false;

  constructor(
    private _drinksService: DrinksService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    let { tastingDate, tastingRate, tastingReview } = this
      .drinkForAddingToStack as ITastedDrinkCreateReview;
    this.tastingForm.patchValue({ tastingDate });
    this.tastingForm.patchValue({ tastingRate });
    this.tastingForm.patchValue({ tastingReview });

    if (tastingDate || tastingRate || tastingReview) {
      this.isEdit = true;
    }
  }

  tastingForm: FormGroup = new FormGroup({
    tastingDate: new FormControl(),
    tastingRate: new FormControl(),
    tastingReview: new FormControl(),
  });

  addToTastedStack() {
    if (!this.isEdit) {
      let userId = JSON.parse(localStorage.getItem('USER_TASTYCLUB')!).id;
      let tastedDrink = Object.assign(
        {},
        this.tastingForm.value,
        { userId },
        this.drinkForAddingToStack
      );

      delete tastedDrink.isTasted;
      this._drinksService
        .postReview(tastedDrink as ITastedDrinkCreateReview)
        .subscribe({
          next: (res: any) => {
            this._toastrService.success(res.message);
            this.returnToMyDrinks();
          },
          error: (error) => this._toastrService.error(error.error.message),
        });
    } else {
      let tastedDrink = Object.assign(
        this.drinkForAddingToStack as ITastedDrinkCreateReview,
        this.tastingForm.value
      );

      this._drinksService
        .putReview(tastedDrink as ITastedDrinkCreateReview)
        .subscribe({
          next: (res: any) => {
            this._toastrService.success(res.message);
            this.returnToMyDrinks();
          },
          error: (error) => this._toastrService.error(error.error.error),
        });
    }
  }

  returnToMyDrinks() {
    this.onReturnToMyDrinks.emit();
  }
}

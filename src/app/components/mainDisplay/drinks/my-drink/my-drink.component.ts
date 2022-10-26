import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  IMyDrinksFindResult,
  ITastedDrinkCreateReview,
} from 'src/app/models/alcohol.model';
import { DrinksService } from 'src/app/services/drinks.service';

@Component({
  selector: 'app-my-drink',
  templateUrl: './my-drink.component.html',
  styleUrls: ['./my-drink.component.scss'],
})
export class MyDrinkComponent implements OnInit {
  @Output() onAdd: EventEmitter<any> = new EventEmitter();
  @Output() onEdit: EventEmitter<any> = new EventEmitter();

  userId = JSON.parse(localStorage.getItem('USER_TASTYCLUB')!).id;
  userTastedDrinks: IMyDrinksFindResult[] = [];
  chosenDrink?: IMyDrinksFindResult;
  chosenDrinkWithAllFields?: ITastedDrinkCreateReview;

  constructor(private _drinksService: DrinksService) {}

  ngOnInit(): void {
    this._drinksService.getAllByUserId(this.userId).subscribe((res: any) => {
      this.userTastedDrinks = res;

      if (this.userTastedDrinks.length > 0) {
        this.choseDrink(this.userTastedDrinks[0]);
      }
    });
  }

  addDrink() {
    this.onAdd.emit();
  }

  choseDrink(drink: IMyDrinksFindResult) {
    this.chosenDrink = drink;
    this._drinksService.getTastedById(this.userId, drink._id).subscribe({
      next: (res) => {
        this.chosenDrinkWithAllFields = res as ITastedDrinkCreateReview;
      },
      error: (error) => console.log(error),
    });
  }

  returnToEditDrinks(drinkForEdit: ITastedDrinkCreateReview) {
    this.onEdit.emit(drinkForEdit);
  }
}

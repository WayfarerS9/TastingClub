import {
  Component,
  EventEmitter,
  OnInit,
  OnDestroy,
  Output,
} from '@angular/core';
import { debounceTime, filter, Subject, Subscription, switchMap } from 'rxjs';
import {
  IChosenDrink,
  IMyDrinksFindResult,
} from 'src/app/models/alcohol.model';
import { DrinksService } from 'src/app/services/drinks.service';

@Component({
  selector: 'app-add-drink',
  templateUrl: './add-drink.component.html',
  styleUrls: ['./add-drink.component.scss'],
})
export class AddDrinkComponent implements OnInit, OnDestroy {
  @Output() onReturnToMyDrinks: EventEmitter<any> = new EventEmitter();
  @Output() onCreateNewDrink: EventEmitter<any> = new EventEmitter();
  @Output() onAddToTastedStack: EventEmitter<IChosenDrink> = new EventEmitter();

  matchingDrinks: Array<IMyDrinksFindResult> = [];
  chosenDrink?: IChosenDrink;
  userId = JSON.parse(localStorage.getItem('USER_TASTYCLUB')!).id;

  subscriptionOnSearchingCriteria!: Subscription;
  searchCriteriaEmmiter = new Subject<string>();

  constructor(private _drinksService: DrinksService) {}

  ngOnInit(): void {
    this.subscriptionOnSearchingCriteria = this.searchCriteriaEmmiter
      .pipe(
        filter((value) => value.length > 2),
        debounceTime(300),
        switchMap((term) => this._drinksService.getBySearch(term))
      )
      .subscribe({
        next: (res: any) => {
          this.matchingDrinks = res;

          if(this.matchingDrinks.length > 0) {
            this.getById(this.matchingDrinks[0]._id, this.userId)
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  ngOnDestroy(): void {
    this.subscriptionOnSearchingCriteria.unsubscribe();
  }

  returnToMyDrinks() {
    this.onReturnToMyDrinks.emit();
  }

  createNewDrink() {
    this.onCreateNewDrink.emit();
  }

  getBySearch(event: any) {
    this.searchCriteriaEmmiter.next(event.target.value.toLowerCase());
  }

  getById(drinkId: string, userId: string) {
    this._drinksService.getById(drinkId, userId).subscribe({
      next: (res: any) => {
        this.chosenDrink = res as IChosenDrink;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addToTastedStack(chosenDrink: IChosenDrink) {
    this.onAddToTastedStack.emit(chosenDrink);
  }
}

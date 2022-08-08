import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  IAddUpdateFeedBack,
  IDrinkForShow,
  IDrinkShort,
  ITastedDrinkFull,
} from 'src/app/models/alcohol.model';
import { Subject, Subscription, switchMap } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { DrinksService } from 'src/app/services/drinks.service';

let getedDrinksShort: Array<IDrinkShort> = [
  {
    _id: '85',
    name: 'Rechickoe',
    typeOfDrink: 'Beer',
    region: 'Belarus',
    category: ['filtered', 'light'],
    strength: 6.5,
    /*     userId: 1,
    dateOfDegustation: '01.08.2022',
    points: 9,
    feedBack: 'Good beer', */
  },
  {
    _id: '86',
    name: 'Grantz',
    typeOfDrink: 'Whisky',
    region: 'Belarus',
    type: 'Blended',
    strength: 45,
    /*     userId: 1,
    dateOfDegustation: '01.08.2022',
    points: 8,
    feedBack: 'Good whisky', */
  },
  {
    _id: '87',
    name: 'Stolichnaya',
    typeOfDrink: 'Vodka',
    region: 'Russia',
    category: ['classic', 'anis'],
    strength: 40,
    /*     userId: 1,
    dateOfDegustation: '01.08.2022',
    points: 10,
    feedBack: 'Good vodka', */
  },
  {
    _id: '88',
    name: 'Kindzmaraylli',
    typeOfDrink: 'Vine',
    region: 'Georgia',
    category: ['semi-sweet', 'red'],
    strength: 9,
    /*     userId: 1,
    dateOfDegustation: '01.08.2022',
    points: 7,
    feedBack: 'Good vine', */
  },
];

let getedDrink = {
  _id: '88',
  name: 'Kindzmaraylli',
  typeOfDrink: 'Vine',
  region: 'Georgia',
  strength: 9,
  volume: 0.7,
  manufacturer: 'Georgia-factory',
  category: ['red', 'semi-sweet'],
  type: 'tasty',
  grape: 'back',
  filtration: 'none',
  userId: 2,
  dateOfDegustation: '02.08.2022',
  points: 9,
  feedBack: 'Very good vine',
};

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss'],
})
export class DrinksComponent implements OnInit {
  isAdd: boolean = false;
  isEdit: boolean = false;
  myTastedDrinks?: Array<IDrinkForShow>;
  selectedTastedDrink?: IDrinkForShow;
  myTastedDrinkFullInfo?: ITastedDrinkFull;
  matchingDrinks?: Array<IDrinkForShow>;
  searchCriteriaEmmiter = new Subject<string>();
  subscriptionOnSearchingCriteria!: Subscription;
  starRating = 0;

  addUpdateFeedBackModel: IAddUpdateFeedBack = {
    userId: 0,
    dateOfDegustation: '',
    rating: 9,
    feedBack: '',
  };

  constructor(
    private _location: Location,
    private _drinksService: DrinksService
  ) {}

  searchDrinks(event: any) {
    if (event.target.value.length < 3) this.matchingDrinks = [];
    this.searchCriteriaEmmiter.next(event.target.value);
  }

  ngOnInit(): void {
    this.addUpdateFeedBackModel.userId = JSON.parse(
      localStorage.getItem('USER_TASTYCLUB')!
    ).id;
    // this.myTastedDrinks = this.getDrinksForShow(getedDrinksShort);

    this.subscriptionOnSearchingCriteria = this.searchCriteriaEmmiter
      .pipe(
        filter((value) => value.length >= 3),
        debounceTime(300),
        switchMap((term) => this._drinksService.searchByCategoryDrinks(term))
      )
      .subscribe((res: any) => {
        this.matchingDrinks = this.getDrinksForShow(res.result);
      });
  }

  getDrinksForShow(drinks: Array<IDrinkShort>): Array<IDrinkForShow> {
    let results: Array<IDrinkForShow> = [];

    drinks.forEach((drink) => {
      let features;
      if (drink.category) {
        features = drink.category.join(', ');
      }
      if (drink.type) {
        features = drink.type;
      }
      let result = {
        id: drink._id,
        title: `${drink.typeOfDrink}, ${drink.name}`,
      };
      results.push(result);
    });
    return results;
  }

  goBack() {
    this._location.back();
  }

  onEdit() {
    this.isEdit = true;
    console.log(this.addUpdateFeedBackModel.rating);
    this.addUpdateFeedBackModel.dateOfDegustation =
      this.myTastedDrinkFullInfo!.dateOfDegustation;
    this.addUpdateFeedBackModel.rating = this.myTastedDrinkFullInfo!.rating;
    this.addUpdateFeedBackModel.feedBack = this.myTastedDrinkFullInfo!.feedBack;
  }

  onAdd() {
    this.isAdd = true;
    /* this.myTastedDrinkFullInfo = new tastedDrinkFullWithFeedBack() */
  }

  backToMyDrinks() {
    this.isAdd = false;
    this.isEdit = false;
  }

  selectAndGetDrink(drink: IDrinkForShow) {
    this.selectedTastedDrink = drink;
    this.isEdit = false;
    this._drinksService
      .searchByIdDrinks(this.selectedTastedDrink)
      .subscribe((res: any) => {
        this.myTastedDrinkFullInfo = res.result;
        this.isAdd = false;
      });
  }

  update() {
    this._drinksService
      .ratingAndReview(this.addUpdateFeedBackModel)
      .subscribe((res) => {
        console.log(res);
      });
  }
}

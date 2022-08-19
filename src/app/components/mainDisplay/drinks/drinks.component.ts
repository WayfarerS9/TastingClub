import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  IAddUpdateFeedBack,
  IDeleteDrink,
  IDrinkForShow,
  IDrinkShort,
  ITastedDrinkFull,
} from 'src/app/models/alcohol.model';
import { Subject, Subscription, switchMap } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { DrinksService } from 'src/app/services/drinks.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss'],
})
export class DrinksComponent implements OnInit {
  isAdd: boolean = false;
  isEdit: boolean = false;
  getShortInfoAboutDrink?: any;
  myTastedDrinks?: Array<IDrinkForShow>;
  selectedTastedDrink?: IDrinkForShow;
  myTastedDrinkFullInfo?: ITastedDrinkFull;
  matchingDrinks?: Array<IDrinkForShow>;
  searchCriteriaEmmiter = new Subject<string>();
  subscriptionOnSearchingCriteria!: Subscription;
  starRating?: number;
  datePicker: string = '';
  result: any;
  tableResult: any;
  userId: any;

  minDate = new Date(1990, 0, 1);
  maxDate = new Date();

  addUpdateFeedBackModel: IAddUpdateFeedBack = {
    firstName: '',
    userId: 0,
    mongoId: '',
    dateOfDegustation: '',
    rating: 0,
    feedBack: '',
  };

  deleteModel: IDeleteDrink = {
    userId: 0,
    mongoId: ''
  }

  constructor(
    private _location: Location,
    private _drinksService: DrinksService,
    private _toastrService: ToastrService,
  ) { }

  searchDrinks(event: any) {
    if (event.target.value.length < 3) this.matchingDrinks = [];
    this.searchCriteriaEmmiter.next(event.target.value);
  }

  ngOnInit(): void {
    this.addUpdateFeedBackModel.userId = JSON.parse(
      localStorage.getItem('USER_TASTYCLUB')!
    ).id;
    this.addUpdateFeedBackModel.firstName = JSON.parse(
      localStorage.getItem('USER_TASTYCLUB')!
    ).firstName;

    this.subscriptionOnSearchingCriteria = this.searchCriteriaEmmiter
      .pipe(
        filter((value) => value.length >= 3),
        debounceTime(300),
        switchMap((term) => this._drinksService.searchByCategoryDrinks(term))
      )
      .subscribe((res: any) => {
        this.matchingDrinks = this.getDrinksForShow(res.result);
      });

    this.shortInfoAboutDrink();
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
        type: drink.typeOfDrink,
        rating: drink.rating,
        feedBack: drink.feedBack,
        title: `${drink.typeOfDrink} ${drink.name}, ${drink.region}, ${features}, ${drink.strength}%`,
        name: drink.name,
        image: drink.image
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
        this.tableResult = res.tableResult[0];
        this.isAdd = false;
      });
  }

  //Update review function
  update() {
    this.result = {
      firstName: this.addUpdateFeedBackModel.firstName,
      userId: this.addUpdateFeedBackModel.userId,
      mongoId: this.myTastedDrinkFullInfo?._id,
      dateOfDegustation: this.datePicker,
      rating: this.starRating,
      feedBack: this.addUpdateFeedBackModel.feedBack,
    };
    this._drinksService.ratingAndReview(this.result).subscribe(
      (res: any) => {
        this._toastrService.success(res.message);
        this.isEdit = false;
        //this.selectAndGetDrink(this.selectedTastedDrink!) и this.shortInfoAboutDrink() отображают изменения которые вносит пользователь, без перезагрузки страницы
        this.selectAndGetDrink(this.selectedTastedDrink!);
        this.shortInfoAboutDrink();
      },
      (error) => {
        this._toastrService.error(error.error.error);
      }
    );
  }

  /* Function to change star rating value, when user select it */
  onRateChange(rate: number) {
    this.starRating = rate;
  }

  onChangeEvent(event: any) {
    this.datePicker = event.value;
  }

  shortInfoAboutDrink() {
    this.getShortInfoAboutDrink = this.addUpdateFeedBackModel.userId;
    this._drinksService
      .getShortInfoAboutDrink(this.getShortInfoAboutDrink)
      .subscribe((res: any) => {
        this.myTastedDrinks = this.getDrinksForShow(res.result);
      });
  }

  //Delete drink function
  delete(event: any) {
    event.stopPropagation();
    this.deleteModel = {
      userId: this.addUpdateFeedBackModel.userId,
      mongoId: this.myTastedDrinkFullInfo?._id,
    }

    this._drinksService.deleteDrink(this.deleteModel).subscribe(
      (res: any) => {
        this._toastrService.success(res.message);
      },
      (error) => {
        this._toastrService.error(error.error.error);
      }
    );
  }
}

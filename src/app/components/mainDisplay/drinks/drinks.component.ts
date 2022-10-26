import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  IChosenDrink,
  ITastedDrinkCreateReview,
} from 'src/app/models/alcohol.model';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss'],
})
export class DrinksComponent implements OnInit {
  isMyDrinks: boolean = true;
  isAdd: boolean = false;
  isEdit: boolean = false;
  isCreate: boolean = false;
  drinkForAddingToStack?: IChosenDrink | ITastedDrinkCreateReview;

  constructor(private _location: Location) {}

  ngOnInit(): void {}

  goBack() {
    this._location.back();
  }

  showAddDrinkComponent() {
    this.isAdd = true;
    this.isMyDrinks = false;
    this.isEdit = false;
    this.isCreate = false;
  }

  showMyDrinkComponent() {
    this.isAdd = false;
    this.isMyDrinks = true;
    this.isEdit = false;
    this.isCreate = false;
  }

  showEditDrinkComponent(drink: IChosenDrink | ITastedDrinkCreateReview) {
    this.drinkForAddingToStack = drink;
    this.isAdd = false;
    this.isMyDrinks = false;
    this.isEdit = true;
    this.isCreate = false;
  }

  showCreateDrinkComponent() {
    this.isAdd = false;
    this.isMyDrinks = false;
    this.isEdit = false;
    this.isCreate = true;
  }
}

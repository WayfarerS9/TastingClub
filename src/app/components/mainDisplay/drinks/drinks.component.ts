import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent implements OnInit {

  constructor(
    private _location: Location
  ) { }

  ngOnInit(): void {
  }

  goBack() {
    this._location.back();
  }

}

import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  constructor(private _location: Location) {}
  searchGroupsFormControl = new FormControl('');

  goBack() {
    this._location.back();
  }

  ngOnInit(): void {}
}

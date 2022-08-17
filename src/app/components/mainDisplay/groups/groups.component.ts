import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  constructor(private _location: Location) {}

  searchingSubject = new Subject<string>()

  isJoin: boolean = false; 
  isCreate: boolean = false; 
  

  ngOnInit(): void {
    this.searchingSubject.subscribe(
      res => console.log(res)
    )
  }





  searchGroups($event: any) {
    console.log($event.target.value)
  }







  goBack() {
    this._location.back();
  }

  onJoin() {
    this.isJoin = true;
    this.isCreate = false;
  }
  
  onCreate() {
    this.isCreate = true;
    this.isJoin = false;
  }

  toInitState() {
    this.isJoin = false;
    this.isCreate = false;
  }




}

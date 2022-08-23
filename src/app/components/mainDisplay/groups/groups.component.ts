import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { GroupsService } from 'src/app/services/groups.service';
import { IMyGroupsShort } from 'src/app/models/groups.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  constructor(private _location: Location, private _groupsService: GroupsService, private _toastrService: ToastrService,) { }

  searchGroupsFormControl = new FormControl('');

  searchingSubject = new Subject<string>()

  isJoin: boolean = false;
  isCreate: boolean = false;

  result: any;

  /* For select group by id */
  selectedGroup?: IMyGroupsShort;

  /* For reset input when user create new group */
  defaultValue: string = '';

  /* For get groups */
  getUserId: any;
  getGroupResult: any;

  /* For creating a group */
  groupsShort: IMyGroupsShort = {
    userId: 0,
    groupName: ''
  }

  ngOnInit(): void {
    this.searchingSubject.subscribe(
      res => console.log(res)
    )

    this.getGroup();
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

  toInitState(group: any) {
    this.isCreate = false;
    this.isJoin = false;
    this.selectedGroup = group;
  }

  //New group create function
  createNewGroup() {
    this.groupsShort.userId = JSON.parse(
      localStorage.getItem('USER_TASTYCLUB')!
    ).id;

    this.result = {
      userId: this.groupsShort.userId,
      groupName: this.groupsShort.groupName,
    };

    this._groupsService.createNewGroup(this.result).subscribe(
      (res: any) => {
        this._toastrService.success(res.message);
        // this.defaultValue = ''
        this.getGroup();
      },
      (error) => {
        this._toastrService.error(error.error.error)
      }
    )
  }

  getGroup() {
    this.getUserId = JSON.parse(
      localStorage.getItem('USER_TASTYCLUB')!
    ).id;

    this._groupsService.getGroup(this.getUserId).subscribe(
      (res: any) => {
        this.getGroupResult = res.result;
      },
      (error) => {
        this._toastrService.error(error.error.error)
      }
    )
  }

  detailsButton(event: any) {
    event.stopPropagation();
  }
}

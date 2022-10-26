import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { GroupsService } from 'src/app/services/groups.service';
import { ToastrService } from 'ngx-toastr';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { IGroupFullForAdmin } from 'src/app/models/groups.model';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {

  isMyGroups: boolean = true;
  isCreateGroup: boolean = false;
  isSearchGroup: boolean = false;
  isSendInvitationToGroup: boolean = false;
  groupForSendingInvitationInput!: IGroupFullForAdmin;

  constructor(private _location: Location, private _groupsService: GroupsService) {}

  ngOnInit(): void {}


  goBack() {
    this._location.back();
  }

  toCreateGroup() {
    this.isMyGroups = false;
    this.isCreateGroup = true;
    this.isSearchGroup = false;
    this.isSendInvitationToGroup = false;
  }
  
  toSearchGroup() {
    this.isMyGroups = false;
    this.isCreateGroup = false;
    this.isSearchGroup = true;
    this.isSendInvitationToGroup = false;
  }
  
  toMyGroups() {
    this.isMyGroups = true;
    this.isCreateGroup = false;
    this.isSearchGroup = false;
    this.isSendInvitationToGroup = false;
  }

  toSendInvitation(sendedGroupForSendingInvitation: IGroupFullForAdmin) {
    this.groupForSendingInvitationInput = sendedGroupForSendingInvitation;
    this.isMyGroups = false;
    this.isCreateGroup = false;
    this.isSearchGroup = false;
    this.isSendInvitationToGroup = true;
  }
}



































/* 
constructor(private _location: Location, private _groupsService: GroupsService, private _toastrService: ToastrService,
  public _dialog: MatDialog,
  private _modalService: NgbModal,) { }

searchGroupsFormControl = new FormControl('');

searchingSubject = new Subject<string>()
closeModal?: string;

isJoin: boolean = false;
isCreate: boolean = false;

result: any;

selectedGroup?: IMyGroupsShort;

defaultValue: string = '';

getUserId: any;
getGroupResult: any;

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

openCreateGroupDialog() {
  let dialogRef =  this._dialog.open(DialogComponent, {
    width: '400px',
    autoFocus: false,
    data: {
      createGroup: 'Are you sure you want to create this group ?',
    }
  });
  dialogRef.afterClosed().subscribe((res) => {
    if (res) {
      this.createNewGroup();
    }
  })
}

triggerModal(content: any) {
  this._modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
    this.closeModal = `Closed with: ${res}`;
  }, (res) => {
    this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
} */

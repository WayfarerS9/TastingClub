import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IUserWithAdditionalInf } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit, OnDestroy {

  @Output() toMyGroups: EventEmitter<any> = new EventEmitter()
  user: IUserWithAdditionalInf | null = this._auth.userInformation;
  userChangesSubscription!: Subscription;

  constructor(private _auth: AuthService, private groupsService: GroupsService, private _toastrService: ToastrService) { }

 
  ngOnInit(): void {
    this.userChangesSubscription = this._auth.userChanges$.subscribe({
      next: (user) => this.user = user
    })
  }

  ngOnDestroy(): void {
    this.userChangesSubscription.unsubscribe();
  }

  createGroupForm: FormGroup = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    isPublic: new FormControl(),
    creatorId: new FormControl(this.user?.id),
    participantsApproved: new FormControl([this.user?.id]),
    participantsRequested: new FormControl([]),
    participantsNotResponded: new FormControl([]),
    participantsDeclined: new FormControl([]),
  })

  goToMyGroups() {
    this.toMyGroups.emit()
  }

  create() {
    this.groupsService.create(this.createGroupForm.value)
      .subscribe( {
        next: (res: any) => {
          this._toastrService.success(res.message);
          this.goToMyGroups();
        },
        error: (error) => console.log(error)    
      })
  }

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IGroupFull, IGroupFullForAdmin, IGroupShort } from 'src/app/models/groups.model';
import { AuthService } from 'src/app/services/auth.service';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-my-groups',
  templateUrl: './my-groups.component.html',
  styleUrls: ['./my-groups.component.scss']
})
export class MyGroupsComponent implements OnInit {

  @Output() toCreateGroups: EventEmitter<any> = new EventEmitter()
  @Output() toSearchGroups: EventEmitter<any> = new EventEmitter()
  @Output() toSendInvitation: EventEmitter<IGroupFullForAdmin> = new EventEmitter()

  userId: string = this._auth.userInformation!.id;
  groups: IGroupShort[] = [];
  chosenGroup!: IGroupShort | null;
  chosenGroupWithFullInformation!: IGroupFullForAdmin | null;


  constructor(private _groupsService: GroupsService, private _auth: AuthService) { }

  ngOnInit(): void {
    this._groupsService.getAllByUserId(this._auth.userInformation!.id).subscribe( res => {
      this.groups = res as IGroupShort[];

      if(this.groups.length > 0) {
        this.chooseGroup(this.groups[0])
      }
    })
  }

  goToCreateGroup() {
    this.toCreateGroups.emit();
  }

  goToSearchGroup() {
    this.toSearchGroups.emit();
  }
  
  goToSendInvitation(chosenGroupWithFullInformation: IGroupFullForAdmin | null) {
    this.toSendInvitation.emit(chosenGroupWithFullInformation as IGroupFullForAdmin);
  }

  chooseGroup(group: IGroupShort) {
    this.chosenGroup = group;
    this._groupsService.getById(group._id).subscribe( res => {
      this.chosenGroupWithFullInformation = res as IGroupFullForAdmin;
    })
  }

}

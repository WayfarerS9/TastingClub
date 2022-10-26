import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IGroupFull, IGroupShort } from 'src/app/models/groups.model';
import { AuthService } from 'src/app/services/auth.service';
import { GroupsService } from 'src/app/services/groups.service';
import { ToastrService } from 'ngx-toastr';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-join-group',
  templateUrl: './join-group.component.html',
  styleUrls: ['./join-group.component.scss']
})
export class JoinGroupComponent implements OnInit {
  @Output() toMyGroups: EventEmitter<any> = new EventEmitter()
  groups: IGroupShort[] = [];
  chosenGroup?: IGroupShort;
  chosenGroupWithFullInformation?: IGroupFull;
  isUserParticipant: boolean = false;
  isUserAdmin: boolean = false;


  constructor(private _groupsService: GroupsService, private _messagesService: MessagesService, private _auth: AuthService, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this._groupsService.getAll().subscribe( res => {
      this.groups = res as IGroupShort[];
      if(this.groups.length > 0) {
        this.choseGroup(this.groups[0]);
      }
    })
  }

  goToMyGroups() {
    this.toMyGroups.emit()
  }

  choseGroup(group: IGroupShort) {
    this.chosenGroup = group;
    this._groupsService.getByUserIdAndGroupId(this.getUserInformation()!.id, group._id).subscribe( res => {      
      this.chosenGroupWithFullInformation = res as IGroupFull;
      this.isUserParticipant = false;
      this.isUserAdmin = false;
      this.isUserAdmin = this.chosenGroupWithFullInformation.creatorId === this.getUserInformation()!.id

      if(!this.isUserAdmin) {
        this.isUserParticipant = this.chosenGroupWithFullInformation.participantsApproved.find( element => {
          return element.id === this.getUserInformation()!.id
        }) ? true : false;
      }
    })
  }

  sendRequestForJoin(userId: string, groupId: string) {
    this._messagesService.sendRequestForJoin(userId, groupId).subscribe({
      next: (res: any) => {
        this.choseGroup(this.chosenGroup as IGroupShort)
        this._toastrService.success(res.message)
      },
      error: (error) => this._toastrService.error(error.error.message),
    });
  }

  getUserInformation() {
    return this._auth.userInformation
  }

}

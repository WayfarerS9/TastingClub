import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { ToastrComponentlessModule } from 'ngx-toastr';
import { debounceTime, filter, Subject, Subscription, switchMap } from 'rxjs';
import { IGroupFullForAdmin } from 'src/app/models/groups.model';
import { IUserWithAdditionalInf } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { GroupsService } from 'src/app/services/groups.service';
import { MessagesService } from 'src/app/services/messages.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-send-invitation-to-group',
  templateUrl: './send-invitation-to-group.component.html',
  styleUrls: ['./send-invitation-to-group.component.scss']
})
export class SendInvitationToGroupComponent implements OnInit, OnDestroy {

  @Output() toMyGroups: EventEmitter<any> = new EventEmitter();
  @Input() groupForSendingInvitationInput!: IGroupFullForAdmin;
  groupForSendingInvitation!: IGroupFullForAdmin; 
  userInformation: IUserWithAdditionalInf | null = this._auth.userInformation;
  searchCriteriaEmitter = new Subject<string>();
  subscriptionOnSearchingResult!: Subscription;
  searchingResults: IUserWithAdditionalInf[] = [];
  chosenUser?: IUserWithAdditionalInf;
  isUserApproved: boolean = false;
  isUserDeclined: boolean = false;
  isUserNotResponded: boolean = false;
  isUserRequested: boolean = false;

  constructor(private _usersService: UsersService, private _messagesService: MessagesService, private _auth: AuthService, private _groupsService: GroupsService) { }

  ngOnInit(): void {
    this.groupForSendingInvitation = this.groupForSendingInvitationInput;
    this.subscriptionOnSearchingResult = this.searchCriteriaEmitter
      .pipe(
        filter( term => term.length > 1),
        debounceTime(300),
        switchMap((term) => this._usersService.getBySearch(term))
      )
      .subscribe({
        next: (res: IUserWithAdditionalInf[]) => {
          this.searchingResults = res;

          if(this.searchingResults.length > 0) this.chooseUser(this.searchingResults[0], this.groupForSendingInvitation as IGroupFullForAdmin )
        },
        error: (error: any) => console.log(error)
      })
  }

  ngOnDestroy(): void {
    this.subscriptionOnSearchingResult.unsubscribe();
  }

  goToMyGroups() {
    this.toMyGroups.emit()
  }

  getBySearch(event: Event) {
    this.searchCriteriaEmitter.next((event.target as HTMLInputElement).value.toLowerCase())
  }

  chooseUser(user: IUserWithAdditionalInf, groupForSendingInvitation: IGroupFullForAdmin) {
    this.chosenUser = user
    this.isUserApproved = groupForSendingInvitation.participantsApproved.find( userElement => userElement.id === user.id) ?  true : false;
    this.isUserRequested = groupForSendingInvitation.participantsRequested.find( userElement => userElement.id === user.id) ? true : false;
    this.isUserDeclined = groupForSendingInvitation.participantsDeclined.includes(user.id);
    this.isUserNotResponded = groupForSendingInvitation.participantsNotResponded.includes(user.id);
  }

  sendInvitation(receiverId: string, mailer: IUserWithAdditionalInf, groupForJoin: IGroupFullForAdmin) {

    let groupForJoinId = groupForJoin._id;
    let groupName = groupForJoin.name;
    let mailerId = mailer.id;
    let mailerName = `${mailer.firstName} ${mailer.lastName}`;

    this._messagesService.sendInvitationForJoin(receiverId, mailerId, groupForJoinId, mailerName, groupName)
      .subscribe({
        next: () => {
          this.reloadGroupForSendingInvitation(this.groupForSendingInvitation._id)
        },
        error: (error) => console.log(error)
      })
  }

  reloadGroupForSendingInvitation(groupId: string) {
    this._groupsService.getById(groupId).subscribe( res => {
      this.groupForSendingInvitation = res as IGroupFullForAdmin;
      this.chooseUser(this.chosenUser as IUserWithAdditionalInf, this.groupForSendingInvitation)
      console.log(this.groupForSendingInvitation)
    })
  }





}



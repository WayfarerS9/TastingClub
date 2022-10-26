import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MessagesService } from 'src/app/services/messages.service';
import { AuthService } from 'src/app/services/auth.service';
import { IMessage } from 'src/app/models/messages.model';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  messages: IMessage[] = [];
  chosenMessage!: IMessage;

  constructor(
    private _location: Location,
    private _messagesService: MessagesService,
    private _authService: AuthService,
    private _groupsService: GroupsService,

  ) {}

  ngOnInit(): void {
    this.getAllMessagesByUserId()
  }

  goBack() {
    this._location.back();
  }

  getAllMessagesByUserId() {
    this._messagesService
      .getAllByUserId(this._authService.userInformation!.id)
      .subscribe((res) => {
        this.messages = res as IMessage[];

        if(this.messages.length > 0) this.chooseMessage(this.messages[0]) 
      });
  }

  chooseMessage(message: IMessage) {
    this.chosenMessage = message;

    if (!this.chosenMessage.isRead) {
      this.chosenMessage.isRead = true;
      this._messagesService
        .changeReadingStatus(this._authService.userInformation!.id, message._id)
        .subscribe({
          next: () => {},
          error: (error) => console.log(error),
        });
    }
  }

  confirmOrRejectJoin(message: IMessage, isConfirm: boolean) {
    let { groupForJoinId, category, mailer, receiverId, _id } = message;

    switch (category) {
      case 'joinGroup':        
        this._groupsService.confirmOrRejectJoin(groupForJoinId as string, mailer.id as string, _id, receiverId, isConfirm, category)
          .subscribe({
            next: () => {
              this.getAllMessagesByUserId();
            },
            error: (error) => console.log(error),
          });
        break;

      case 'inviteToGroup':        
        this._groupsService.confirmOrRejectJoin(groupForJoinId as string, receiverId as string, _id, mailer.id, isConfirm, category)
          .subscribe({
            next: () => {
              this.getAllMessagesByUserId();
            },
            error: (error) => console.log(error),
          });
        break;
    }
  }
}

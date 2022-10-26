import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private _http: HttpClient) { }

  getAllByUserId(userId: string) {
    return this._http.get(environment.apiUrl + `/messages/getAllByUserId?userId=${userId}`)
  }

  sendRequestForJoin(userId: string, groupId: string) {
    return this._http.post(environment.apiUrl + `/messages/handleRequestForJoin`, {userId, groupId})
  }

  sendInvitationForJoin(receiverId: string, mailerId: string, groupForJoinId: string, mailerName: string, groupName: string) {
    return this._http.post(environment.apiUrl + `/messages/handleRequestForInvitation`, {receiverId, mailerId, groupForJoinId, mailerName, groupName})
  }

  changeReadingStatus(userId: string, messageId: string) {
    return this._http.put(environment.apiUrl + `/messages/changeReadingStatus`, {userId, messageId})
  }
}

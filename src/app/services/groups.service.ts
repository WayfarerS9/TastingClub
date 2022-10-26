import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IGroupCreate } from '../models/groups.model';

@Injectable({
    providedIn: 'root',
})

export class GroupsService {
    constructor(private _http: HttpClient) { }


    getAll() {
        return this._http.get(environment.apiUrl + `/groups/getAll`)
    }

    getAllByUserId(userId: string) {
        return this._http.get(environment.apiUrl + `/groups/getAllByUserId?userId=${userId}`)
    }

    getByUserIdAndGroupId(userId: string, groupId: string) {
        return this._http.get(environment.apiUrl + `/groups/getByUserIdAndGroupId?userId=${userId}&groupId=${groupId}`)
    }

    getById(groupId: string) {
        return this._http.get(environment.apiUrl + `/groups/getById?groupId=${groupId}`)        
    }

    create(groupCreateModel: IGroupCreate) {
        return this._http.post(environment.apiUrl + `/groups/create`, groupCreateModel)
    }

    confirmOrRejectJoin(groupForJoinId: string, candidateId: string, messageId: string, receiverId: string, isConfirm: boolean, category: string) {
        return this._http.put(environment.apiUrl + `/groups/confirmOrRejectJoin`, {groupForJoinId, candidateId, messageId, receiverId, isConfirm, category})
    }

/*     createNewGroup(model: IMyGroupsShort) {
        return this._http.post(environment.apiUrl + `/create-new-group`, model);
    }

    getGroup(term: number) {
        return this._http.get(environment.apiUrl + `/groups/${term}`);
    } */
}
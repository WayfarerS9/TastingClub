import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IMyGroupsShort } from '../models/groups.model';

@Injectable({
    providedIn: 'root',
})

export class GroupsService {
    constructor(private _http: HttpClient) { }

    createNewGroup(model: IMyGroupsShort) {
        return this._http.post(environment.apiUrl + `/create-new-group`, model);
    }

    getGroup(term: number) {
        return this._http.get(environment.apiUrl + `/groups/${term}`);
    }
}
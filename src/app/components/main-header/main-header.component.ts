import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IUserWithAdditionalInf } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit, OnDestroy {
  subscriptionForUserChange!: Subscription;
  user: IUserWithAdditionalInf | null = this._auth.userInformation;
 
  constructor(private _auth: AuthService,) { }

  ngOnInit(): void {
    this.subscriptionForUserChange = this._auth.userChanges$.subscribe( res => {
      this.user = res;
    })
  }

  ngOnDestroy(): void {
    this.subscriptionForUserChange.unsubscribe();
  }

  logOut() {
    this._auth.logOut();
  }
}

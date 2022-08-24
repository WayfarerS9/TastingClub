import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  user!: any;

  constructor(private _router: Router) { }

  ngOnInit(): void {
    let userString = localStorage.getItem('USER_TASTYCLUB');
    this.user = userString ? JSON.parse(userString) : null;
  }

  logOut() {
    localStorage.removeItem('USER_TASTYCLUB');
    localStorage.removeItem('TOKEN_TASTYCLUB');
    this._router.navigate(['/auth/login']);
  }
}

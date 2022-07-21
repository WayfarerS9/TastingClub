import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  user!: any;
  search : String ="";
  
  constructor(private _router: Router) {}

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

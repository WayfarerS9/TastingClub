import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Utils } from './auth.utils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _router: Router, private _utils: Utils) {}

  ngOnInit() {}

  canActivate(): boolean {
    if (this._utils.loggedIn()) {
      return true;
    } else {
      this._router.navigate(['/auth/login']);
      return false;
    }
  }
}

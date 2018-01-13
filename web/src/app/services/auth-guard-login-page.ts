import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()

export class AuthGuardLoginPage implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate() {
    if (this.authService.zalogowano()) {
      this.router.navigate(['/zarzadzanie-zwierzetami']);
      return false;
    }
    return true;
  }
}

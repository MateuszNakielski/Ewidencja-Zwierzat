import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {AsyncLocalStorage} from 'angular-async-local-storage';
import {User} from '../model/user';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {

  constructor(private router: Router, private localStorage: AsyncLocalStorage) { }

  zaloguj(login: string, haslo: string) {
    this.localStorage.setItem('user', new User(login, haslo)).subscribe(() => {
      this.localStorage.getItem('user').subscribe(usr => {
        if (usr != null && usr.haslo !== '' && usr.login !== '') {
          this.localStorage.setItem('logged', true).subscribe(() => {
            this.router.navigate(['/zarzadzanie-zwierzetami']);
          });
        }
      });
    });
  }

  wyloguj() {
    this.localStorage.clear();
    this.router.navigate(['/']);
  }

  zalogowano(): Observable<boolean> {
    return this.localStorage.getItem('logged');
  }

}

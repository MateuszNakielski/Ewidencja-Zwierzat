import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../model/user';

@Injectable()
export class AuthService {

  constructor(private router: Router) { }

  zaloguj(login: string, haslo: string) {
    const usr = new User(login, haslo);
    if (usr.haslo !== '' && usr.login !== '') {
      localStorage.setItem('user', JSON.stringify(usr));
      localStorage.setItem('logged', JSON.stringify(true));
      this.router.navigate(['/zarzadzanie-zwierzetami']);
    }
  }

  wyloguj() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  podajUzytkownika(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  zalogowano(): boolean {
    let czyZalogowano = JSON.parse(localStorage.getItem('logged'));
    if (czyZalogowano == null) {
      czyZalogowano = false;
    }
    return czyZalogowano;
  }

}

import {Component, OnChanges, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {
  pokazMenu = false;
  uzytkownikZalogowany = false;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.zalogowano().subscribe(log => {
      this.uzytkownikZalogowany = log;
    });
  }

  schowajMenu(el) {
    console.log(el);
    if (!el.srcElement.className.includes('menu-phone') && !el.srcElement.className.includes('kladka')) {
      this.pokazMenu = false;
    }
  }
}

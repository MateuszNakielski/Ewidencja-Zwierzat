import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-logowanie',
  templateUrl: './logowanie.component.html',
  styleUrls: ['./logowanie.component.scss']
})
export class LogowanieComponent implements OnInit {
  login = '';
  haslo = '';

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  zaloguj() {
    this.auth.zaloguj(this.login, this.haslo);
  }

}

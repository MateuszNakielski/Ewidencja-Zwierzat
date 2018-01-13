import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-touch-menu',
  templateUrl: './touch-menu.component.html',
  styleUrls: ['./touch-menu.component.scss']
})
export class TouchMenuComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  onWylogujClick() {
    this.auth.wyloguj();
  }

}

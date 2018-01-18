import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Zwierze} from '../../model/zwierze';
import {RestService} from '../../services/rest.service';
import {PageComponent} from '../page/page.component';
import {Location} from '@angular/common';
import {AppMessageService} from '../../services/message.service';
import {Message} from 'primeng/primeng';
import {Router} from '@angular/router';

@Component({
  selector: 'app-lista-zwierzat',
  templateUrl: './lista-zwierzat.component.html',
  styleUrls: ['./lista-zwierzat.component.scss']
})
export class ListaZwierzatComponent implements OnInit {

  @Input() zwierzeta: Zwierze[];

  url = '';
  sukcesMsgs = [];

  constructor(private router: Router, public rest: RestService, private msgServ: AppMessageService) { }

  ngOnInit() {
    this.url = this.rest.url;
    this.sukcesMsgs = this.msgServ.podajSukcesy();
  }

  goBack() {
    this.router.navigate(['/zarzadzanie-zwierzetami']);
  }

}

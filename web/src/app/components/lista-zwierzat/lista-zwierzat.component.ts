import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Zwierze} from '../../model/zwierze';
import {RestService} from '../../services/rest.service';
import {PageComponent} from '../page/page.component';
import {Location} from '@angular/common';

@Component({
  selector: 'app-lista-zwierzat',
  templateUrl: './lista-zwierzat.component.html',
  styleUrls: ['./lista-zwierzat.component.scss']
})
export class ListaZwierzatComponent implements OnInit {

  @Input() zwierzeta: Zwierze[];

  url = '';

  constructor(private location: Location, public rest: RestService) { }

  ngOnInit() {
    this.url = this.rest.url;
  }

  goBack() {
    this.location.back();
  }

}

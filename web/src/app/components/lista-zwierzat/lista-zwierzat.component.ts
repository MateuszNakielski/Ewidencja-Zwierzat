import {Component, Input, OnInit} from '@angular/core';
import {Zwierze} from '../../model/zwierze';
import {RestService} from '../../services/rest.service';

@Component({
  selector: 'app-lista-zwierzat',
  templateUrl: './lista-zwierzat.component.html',
  styleUrls: ['./lista-zwierzat.component.scss']
})
export class ListaZwierzatComponent implements OnInit {

  @Input() zwierzeta: Zwierze[];

  url = '';

  constructor(public rest: RestService) { }

  ngOnInit() {
    this.url = this.rest.url;
  }

}

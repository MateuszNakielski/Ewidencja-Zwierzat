import {Component, Input, OnInit} from '@angular/core';
import {Zwierze} from '../../model/zwierze';

@Component({
  selector: 'app-lista-zwierzat',
  templateUrl: './lista-zwierzat.component.html',
  styleUrls: ['./lista-zwierzat.component.scss']
})
export class ListaZwierzatComponent implements OnInit {

  @Input() zwierzeta: Zwierze[];

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import {Zwierze} from '../../model/zwierze';

@Component({
  selector: 'app-wszystkie-zwierzeta',
  templateUrl: './wszystkie-zwierzeta.component.html',
  styleUrls: ['./wszystkie-zwierzeta.component.scss']
})
export class WszystkieZwierzetaComponent implements OnInit {
  zwierzeta = [new Zwierze(), new Zwierze(), new Zwierze(), new Zwierze(), new Zwierze(), new Zwierze(), new Zwierze()];
  constructor() { }

  ngOnInit() {
  }

}

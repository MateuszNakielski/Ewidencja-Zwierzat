import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmDialog} from 'primeng/primeng';

@Component({
  selector: 'app-potwierdzenie',
  templateUrl: './potwierdzenie.component.html',
  styleUrls: ['./potwierdzenie.component.scss']
})
export class PotwierdzenieComponent implements OnInit {
  @ViewChild(ConfirmDialog) cd;

  constructor() { }

  ngOnInit() {
  }

}

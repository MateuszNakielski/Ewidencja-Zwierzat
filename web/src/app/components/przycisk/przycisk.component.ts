import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-przycisk',
  templateUrl: './przycisk.component.html',
  styleUrls: ['./przycisk.component.scss']
})
export class PrzyciskComponent implements OnInit {
  @Input() important = false;
  @Input() big = false;
  @Input() type = '';

  constructor() { }

  ngOnInit() {
  }

}

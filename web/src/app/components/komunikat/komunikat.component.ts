import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-komunikat',
  templateUrl: './komunikat.component.html',
  styleUrls: ['./komunikat.component.scss']
})
export class KomunikatComponent implements OnInit {
  @Input() good = true;
  @Input() bad = false;

  constructor() { }

  ngOnInit() {
  }

}

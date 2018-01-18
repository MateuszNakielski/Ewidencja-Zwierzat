import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-komunikat',
  templateUrl: './komunikat.component.html',
  styleUrls: ['./komunikat.component.scss']
})
export class KomunikatComponent implements OnInit {
  @Input() good = false;
  @Input() bad = false;
  @Input() brakDanych = false;
  constructor() { }

  ngOnInit() {
  }

}

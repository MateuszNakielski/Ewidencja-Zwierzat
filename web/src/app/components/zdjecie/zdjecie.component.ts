import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-zdjecie',
  templateUrl: './zdjecie.component.html',
  styleUrls: ['./zdjecie.component.scss']
})
export class ZdjecieComponent implements OnInit {
  @Input() url;
  @Input() height;
  @Input() big = false;

  constructor() { }

  ngOnInit() {
  }

}

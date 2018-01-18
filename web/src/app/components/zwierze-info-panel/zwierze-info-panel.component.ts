import {Component, Input, OnInit} from '@angular/core';
import {Zwierze} from '../../model/zwierze';
import {RestService} from '../../services/rest.service';

@Component({
  selector: 'app-zwierze-info-panel',
  templateUrl: './zwierze-info-panel.component.html',
  styleUrls: ['./zwierze-info-panel.component.scss']
})
export class ZwierzeInfoPanelComponent implements OnInit {
  @Input() zwierze: Zwierze;
  url = '';
  constructor(private rest: RestService) { }

  ngOnInit() {
    this.url = this.rest.url;
  }

}

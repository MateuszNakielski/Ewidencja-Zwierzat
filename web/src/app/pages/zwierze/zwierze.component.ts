import { Component, OnInit } from '@angular/core';
import {Zwierze} from '../../model/zwierze';
import {Plik} from '../../model/plik';
import {ZwierzeService} from '../../services/zwierze.service';
import {ActivatedRoute} from '@angular/router';
import {RestService} from '../../services/rest.service';
import {EdytujZwierzeRequest} from '../../model/rest/zwierze/edytujZwierzeRequest';

@Component({
  selector: 'app-zwierze',
  templateUrl: './zwierze.component.html',
  styleUrls: ['./zwierze.component.scss']
})
export class ZwierzeComponent implements OnInit {

  zwierze: Zwierze;

  url = '';

  constructor(private route: ActivatedRoute, private rest: RestService, private zwServ: ZwierzeService) {
    this.zwierze = new Zwierze();
  }

  ngOnInit() {
    this.url = this.rest.url;
    this.route.params.subscribe(params => {
      this.zwServ.podajZwierze(params['id']).subscribe(res => {
        console.log(res);
        this.zwierze = res.zwierzeDTO;
      }, err => console.log(err));
    });
  }

}

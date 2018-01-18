import { Component, OnInit } from '@angular/core';
import {Zwierze} from '../../model/zwierze';
import {Plik} from '../../model/plik';
import {ZwierzeService} from '../../services/zwierze.service';
import {ActivatedRoute} from '@angular/router';
import {RestService} from '../../services/rest.service';
import {EdytujZwierzeRequest} from '../../model/rest/zwierze/edytujZwierzeRequest';
import {Location} from '@angular/common';

@Component({
  selector: 'app-zwierze',
  templateUrl: './zwierze.component.html',
  styleUrls: ['./zwierze.component.scss']
})
export class ZwierzeComponent implements OnInit {

  zwierze: Zwierze;

  constructor(private location: Location, private route: ActivatedRoute, private zwServ: ZwierzeService) {
    this.zwierze = new Zwierze();
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.zwServ.podajZwierze(params['id']).subscribe(res => {
        console.log(res);
        this.zwierze = res.zwierzeDTO;
      }, err => console.log(err));
    });
  }

  goBack() {
    this.location.back();
  }

}

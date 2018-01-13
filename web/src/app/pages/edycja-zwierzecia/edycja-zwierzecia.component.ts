import { Component, OnInit } from '@angular/core';
import {Zwierze} from '../../model/zwierze';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edycja-zwierzecia',
  templateUrl: './edycja-zwierzecia.component.html',
  styleUrls: ['./edycja-zwierzecia.component.scss']
})
export class EdycjaZwierzeciaComponent implements OnInit {

  zwierze: Zwierze;

  constructor(private route: ActivatedRoute) {
    this.zwierze = new Zwierze();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params['id']); // id ze sciezki.
    });
  }
}

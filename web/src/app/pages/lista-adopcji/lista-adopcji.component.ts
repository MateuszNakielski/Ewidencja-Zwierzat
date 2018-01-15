import {Component, Input, OnInit} from '@angular/core';
import {RestService} from '../../services/rest.service';
import {Adopcja} from '../../model/adopcja';
import {Location} from '@angular/common';

@Component({
  selector: 'app-lista-adopcji',
  templateUrl: './lista-adopcji.component.html',
  styleUrls: ['./lista-adopcji.component.scss']
})
export class ListaAdopcjiComponent implements OnInit {

  @Input() adopcje: Adopcja[];

  url = '';

  constructor(private location: Location, public rest: RestService) {
    this.adopcje = [new Adopcja(), new Adopcja()];
  }

  ngOnInit() {
    this.url = this.rest.url;
  }

  goBack() {
    this.location.back();
  }

}

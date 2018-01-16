import {Component, OnInit, ViewChild} from '@angular/core';
import {RestService} from '../../services/rest.service';
import {Adopcja} from '../../model/adopcja';
import {Location} from '@angular/common';
import {AdopcjaService} from '../../services/adopcja.service';
import {PageComponent} from '../../components/page/page.component';

@Component({
  selector: 'app-lista-adopcji',
  templateUrl: './lista-adopcji.component.html',
  styleUrls: ['./lista-adopcji.component.scss']
})
export class ListaAdopcjiComponent implements OnInit {
  @ViewChild(PageComponent) page;
  adopcje: Adopcja[];

  url = '';

  constructor(private location: Location, public rest: RestService, public adopcjaServ: AdopcjaService) {
    this.adopcje = [];
  }

  ngOnInit() {
    this.url = this.rest.url;
    this.page.wczytywanie = true;
    this.adopcjaServ.podajAdopcje().subscribe(r => {
      this.adopcje = r.listaAdopcji;
      this.page.wczytywanie = false;
    }, err => console.log(err));
  }

  goBack() {
    this.location.back();
  }

  usunAdopcje(id: number) {
    this.adopcjaServ.usunAdopcje(id)
      .subscribe(r => {
        console.log('sukces', r);
        this.adopcje = this.adopcje.filter(ad => ad.id !== id);
        }, err => console.log('blad usuwania', err));
  }
}

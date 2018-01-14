import {Component, OnInit, ViewChild} from '@angular/core';
import {Zwierze} from '../../model/zwierze';
import {ZwierzeService} from '../../services/zwierze.service';
import {PageComponent} from '../../components/page/page.component';

@Component({
  selector: 'app-wszystkie-zwierzeta',
  templateUrl: './wszystkie-zwierzeta.component.html',
  styleUrls: ['./wszystkie-zwierzeta.component.scss']
})
export class WszystkieZwierzetaComponent implements OnInit {
  @ViewChild(PageComponent) page;
  zwierzeta: Zwierze[] = [];
  constructor(private zwServ: ZwierzeService) { }

  ngOnInit() {
    this.page.wczytywanie = true;
    this.zwServ.podajZwierzeta().subscribe(r => {
      this.page.wczytywanie = false;
      this.zwierzeta = r.listaZwierzat;
    }, err => this.page.wczytywanie = false);
  }

}

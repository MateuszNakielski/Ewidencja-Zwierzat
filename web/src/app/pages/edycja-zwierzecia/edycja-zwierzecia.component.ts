import {AfterViewChecked, Component, OnInit, ViewChild} from '@angular/core';
import {Zwierze} from '../../model/zwierze';
import {ActivatedRoute} from '@angular/router';
import {RestService} from '../../services/rest.service';
import {ZwierzeService} from '../../services/zwierze.service';
import {EdytujZwierzeResponse} from '../../model/rest/zwierze/edytujZwierzeResponse';
import {EdytujZwierzeRequest} from '../../model/rest/zwierze/edytujZwierzeRequest';
import {Plik} from '../../model/plik';

@Component({
  selector: 'app-edycja-zwierzecia',
  templateUrl: './edycja-zwierzecia.component.html',
  styleUrls: ['./edycja-zwierzecia.component.scss']
})
export class EdycjaZwierzeciaComponent implements OnInit, AfterViewChecked {
  @ViewChild('gatunekRasa') gatunekRasa;
  zwierze: Zwierze;

  url = '';

  imie: string;
  wiek: number;
  rasa: string;
  gatunek: string;
  opis: string;
  plik: Plik;


  edycjaTrue = false;
  edycjaFalse = false;
  komunikatBad = 'Błąd danych formularza';

  constructor(private route: ActivatedRoute, private rest: RestService, private zwServ: ZwierzeService) {
    this.zwierze = new Zwierze();
  }

  ngOnInit() {
    this.url = this.rest.url;
    this.route.params.subscribe(params => {
      this.zwServ.podajZwierze(params['id']).subscribe(res => {
        console.log(res);
        this.zwierze = res.zwierzeDTO;
        this.imie = this.zwierze.imie;
        this.wiek = this.zwierze.wiek;
        this.gatunek = this.zwierze.gatunek;
        this.rasa = this.zwierze.rasa;
        this.opis = this.zwierze.opis;
      }, err => console.log(err));
    });
  }

  ngAfterViewChecked() {
    this.gatunekRasa.ustawRasy();
  }

  zmienOpis(o) {
    this.opis = o;
  }

  wyborGatunku(g) {
    this.gatunek = g;
  }

  wyborRasy(r) {
    this.rasa = r;
  }

  zapiszZmiany() {
    const edyt = new EdytujZwierzeRequest();
    edyt.zwierze = new Zwierze();
    edyt.zwierze.id = this.zwierze.id;
    edyt.zwierze.gatunek = this.gatunek;
    edyt.zwierze.rasa = this.rasa;
    edyt.zwierze.imie = this.imie;
    edyt.zwierze.wiek = this.wiek;
    edyt.zwierze.opis = this.opis;
    edyt.zwierzeFoto = this.plik;
    if (this.waliduj()) {
      this.zwServ.edytujZwierze(edyt).subscribe(res => {
        this.pokazKomunikatGood();
        this.zwServ.podajZwierze(this.zwierze.id).subscribe(r => {
          this.zwierze = res.zwierzeDTO;
        }, er => console.log(er));
      }, err => console.log(err));
    } else {
      this.pokazKomunikatBad();
    }
  }

  ustawZdjecie(z) {
    this.plik = z;
  }

  waliduj(): boolean {
    if (!this.imie || !this.wiek || !this.gatunek || !this.rasa) {
      this.komunikatBad = 'Należy uzupełnić wszystkie pola formularza';
      return false;
    }
    if (isNaN(this.wiek)) {
      this.komunikatBad = 'Podano niepopraną wartość wieku.';
      return false;
    }
    return true;
  }

  pokazKomunikatGood() {
    this.edycjaTrue = true;
    this.edycjaFalse = false;
  }

  pokazKomunikatBad() {
    this.edycjaTrue = false;
    this.edycjaFalse = true;
  }



}

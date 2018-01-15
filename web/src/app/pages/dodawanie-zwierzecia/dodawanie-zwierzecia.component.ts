import {Component, OnInit, ViewChild} from '@angular/core';
import {StateService} from '../../services/state.service';
import {FileService} from '../../services/file.service';
import {Zwierze} from '../../model/zwierze';
import {ZwierzeService} from '../../services/zwierze.service';
import {ZwierzeParam} from '../../model/zwierzeParam';
import {UtworzZwierzeRequest} from '../../model/rest/zwierze/utworzZwierzeRequest';
import {Plik} from '../../model/plik';
import {Location} from '@angular/common';

@Component({
  selector: 'app-dodawanie-zwierzecia',
  templateUrl: './dodawanie-zwierzecia.component.html',
  styleUrls: ['./dodawanie-zwierzecia.component.scss']
})
export class DodawanieZwierzeciaComponent implements OnInit {
  @ViewChild('fileInput') fileInput;

  imie: string;
  wiek: number;
  rasa: string;
  gatunek: string;
  opis: string;
  plik: Plik;

  dodanieTrue = false;
  dodanieFalse = false;
  komunikatBad = 'Błąd danych formularza';

  constructor(private location: Location, private stateServ: StateService, private fileServ: FileService, private zwierzeServ: ZwierzeService) { }

  ngOnInit() {
  }

  ustawRase(rasa) {
    this.rasa = rasa;
  }

  ustawGatunek(gatunek) {
    this.gatunek = gatunek;
  }

  ustawOpis(opis) {
    this.opis = opis;
  }

  podajPlik(plik) {
    this.plik = plik;
  }

  dodajZwierze() {
    const zw = new UtworzZwierzeRequest();
    zw.zwierze = new Zwierze();
    zw.zwierze.imie = this.imie;
    zw.zwierze.wiek = this.wiek;
    zw.zwierze.gatunek = this.gatunek;
    zw.zwierze.rasa = this.rasa;
    zw.zwierze.opis = this.opis;
    zw.zwierzeFoto = this.plik;
    if (this.waliduj()) {
      this.zwierzeServ.dodajZwierze(zw).subscribe(r => {
        console.log(r);
        this.dodanieTrue = true;
        this.dodanieFalse = false;
      }, err => console.log(err));
    } else {
      this.dodanieTrue = false;
      this.dodanieFalse = true;
    }
  }

  waliduj(): boolean {
    if (!this.imie || !this.wiek || !this.gatunek || !this.rasa) {
      this.komunikatBad = 'Należy uzupełnić wszystkie wymagane pola formularza';
      return false;
    }
    if (this.plik == null || !this.plik.fileName || !this.plik.fileContent) {
      this.komunikatBad = 'Zdjęcie zwierzęcia jest wymagane.';
      return false;
    }
    if (isNaN(this.wiek)) {
      this.komunikatBad = 'Podano niepopraną wartość wieku.';
      return false;
    }
    return true;
  }

  wyczysc() {
    this.imie = '';
    this.wiek = null;
    this.plik = null;
    this.stateServ.ustawStan('inputClear');
  }

  goBack() {
    this.location.back();
  }

}

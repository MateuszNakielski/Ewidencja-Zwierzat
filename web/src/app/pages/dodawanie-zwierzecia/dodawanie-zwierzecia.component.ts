import { Component, OnInit } from '@angular/core';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'app-dodawanie-zwierzecia',
  templateUrl: './dodawanie-zwierzecia.component.html',
  styleUrls: ['./dodawanie-zwierzecia.component.scss']
})
export class DodawanieZwierzeciaComponent implements OnInit {

  constructor(private stateServ: StateService) { }

  imie: string;
  wiek: string;
  rasa: string;
  gatunek: string;
  opis: string;

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

  wyczysc() {
    console.log(this.imie + this.wiek + this.rasa + this.gatunek);
    this.imie = '';
    this.wiek = '';
    this.stateServ.ustawStan('inputClear');
    console.log(this.imie + this.wiek + this.rasa + this.gatunek);
  }

}

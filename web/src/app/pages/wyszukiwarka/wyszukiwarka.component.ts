import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Zwierze} from '../../model/zwierze';
import {StateService} from '../../services/state.service';
import {ZwierzeParam} from '../../model/zwierzeParam';
import {ZwierzeService} from '../../services/zwierze.service';
import {PageComponent} from '../../components/page/page.component';
import {Location} from '@angular/common';

@Component({
  selector: 'app-wyszukiwarka',
  templateUrl: './wyszukiwarka.component.html',
  styleUrls: ['./wyszukiwarka.component.scss']
})
export class WyszukiwarkaComponent implements OnInit {
  @ViewChild(PageComponent) page;

  gatunek = '';
  rasa = '';

  odszukano = false;
  odszukaneZwierzeta = [];

  form: FormGroup;

  constructor(private location: Location, private fb: FormBuilder, private stateServ: StateService, private zwServ: ZwierzeService) { // <--- inject FormBuilder
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      imie: '',
      wiek: '',
    });
  }

  ngOnInit() {
  }

  wyczysc() {
    this.form.reset();
    this.stateServ.ustawStan('inputClear');
  }

  wyborGatunku(g) {
    this.gatunek = g;
  }

  wyborRasy(r) {
    this.rasa = r;
  }

  wyszukaj() {
    const param = new ZwierzeParam();
    let jestWartosc = false;

    if (this.form.get('wiek').value) {
      param.wiek = this.form.get('wiek').value;
      jestWartosc = true;
    }
    if (this.form.get('imie').value) {
      param.imie = this.form.get('imie').value;
      jestWartosc = true;
    }
    if (this.rasa) {
      param.rasa = this.rasa;
      jestWartosc = true;
    }
    if (this.gatunek) {
      param.gatunek = this.gatunek;
      jestWartosc = true;
    }
    if (jestWartosc) {
      this.page.wczytywanie = true;
      this.zwServ.podajZwierzeta(param).subscribe(zw => {
        this.odszukaneZwierzeta = zw.listaZwierzat;
        this.odszukano = true;
        this.page.wczytywanie = false;
      }, err => {
        console.log(err);
        this.page.wczytywanie = false;
      });
    } else {
      //TODO: pokaż komunikat, że należy wybrać jakiś parametr.
    }
  }

  goBack() {
    this.location.back();
  }

}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Zwierze} from '../../model/zwierze';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'app-wyszukiwarka',
  templateUrl: './wyszukiwarka.component.html',
  styleUrls: ['./wyszukiwarka.component.scss']
})
export class WyszukiwarkaComponent implements OnInit {

  gatunek = '';
  rasa = '';

  odszukano = false;
  odszukaneZwierzeta = [new Zwierze(), new Zwierze(), new Zwierze()];

  form: FormGroup;

  constructor(private fb: FormBuilder, private stateServ: StateService) { // <--- inject FormBuilder
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      nr: '',
      imie: '',
      wiek: '',
    });
  }

  ngOnInit() { }

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
    this.odszukano = true;
  }

}

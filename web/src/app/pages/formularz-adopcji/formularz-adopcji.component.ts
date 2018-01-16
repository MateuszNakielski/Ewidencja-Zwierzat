import { Component, OnInit } from '@angular/core';
import {RestService} from '../../services/rest.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {Zwierze} from '../../model/zwierze';

@Component({
  selector: 'app-formularz-adopcji',
  templateUrl: './formularz-adopcji.component.html',
  styleUrls: ['./formularz-adopcji.component.scss']
})
export class FormularzAdopcjiComponent implements OnInit {
  url = '';
  title = '';
  edycja = false;
  dodawanie = false;
  przyciskSubmit = 'Zatwierdź adopcję';

  zwierze: Zwierze;

  form: FormGroup;

  constructor(private location: Location, private router: Router, private rest: RestService, private fb: FormBuilder) {
    this.zwierze = new Zwierze();
    this.form = fb.group({
      imie: ['', Validators.required],
      nazwisko: ['', Validators.required],
      email: ['', Validators.required],
      telefon: ['', Validators.required],
      miejscowosc: ['', Validators.required],
      nrDowodu: ['', Validators.required],
      seriaDowodu: ['', Validators.required],
      ulica: [''],
      kodPocztowy: ['', Validators.required],
      nrDomu: ['', Validators.required],
      nrMieszkania: ['']
    });
  }

  ngOnInit() {
    this.url = this.rest.url;
    if (this.router.url.search('dodawanie-adopcji') !== -1) {
      this.dodawanie = true;
      this.title = 'Dodawanie adopcji'
      this.przyciskSubmit = 'Dodaj adopcję';
      console.log(this.router.url + ' to: ' + this.router.url.search('dodawanie-adopcji'));
    } else {
      this.edycja = true;
      this.title = 'Edycja adopcji';
      this.przyciskSubmit = 'Edytuj adopcję';
      console.log(this.router.url + ' to: ' + this.router.url.search('dodawanie-adopcji'));
    }
  }

  goBack() {
    this.location.back();
  }

  czyBladPola(nazwaPola: string): boolean {
    const pole = this.form.get(nazwaPola);
    return pole.dirty && pole.invalid;
  }

  adoptuj() {

  }

  wyczysc() {
    this.form.reset();
  }

}

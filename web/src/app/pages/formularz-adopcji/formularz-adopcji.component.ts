import { Component, OnInit } from '@angular/core';
import {RestService} from '../../services/rest.service';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {Location} from '@angular/common';

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

  constructor(private location: Location, private router: Router, private rest: RestService, private fb: FormBuilder) { }

  ngOnInit() {
    this.url = this.rest.url;
    if (this.router.url.search('dodawanie-adopcji') !== -1) {
      this.dodawanie = true;
      this.title = 'Dodawanie adopcji';
      console.log(this.router.url + ' to: ' + this.router.url.search('dodawanie-adopcji'));
    } else {
      this.edycja = true;
      this.title = 'Edycja adopcji';
      console.log(this.router.url + ' to: ' + this.router.url.search('dodawanie-adopcji'));
    }
  }

  goBack() {
    this.location.back();
  }

}

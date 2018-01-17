import { Component, OnInit } from '@angular/core';
import {RestService} from '../../services/rest.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {Zwierze} from '../../model/zwierze';
import {AdopcjaService} from '../../services/adopcja.service';
import {UtworzAdopcjeRequestDTO} from '../../model/rest/adopcja/utworzAdopcjeRequest';
import {ZwierzeService} from '../../services/zwierze.service';
import {OsobaAdoptujaca} from '../../model/osobaAdoptujaca';
import {Adopcja} from '../../model/adopcja';
import {EdytujAdopcjeRequestDTO} from '../../model/rest/adopcja/edytujAdopcjeRequest';
import {PdfService} from '../../services/pdf.service';

@Component({
  selector: 'app-formularz-adopcji',
  templateUrl: './formularz-adopcji.component.html',
  styleUrls: ['./formularz-adopcji.component.scss']
})
export class FormularzAdopcjiComponent implements OnInit {
  fotoUrl;
  title = '';
  edycja = false;
  dodawanie = false;
  przyciskSubmit = 'Zatwierdź adopcję';
  idObecnejAdopcji: number;
  zwierze: Zwierze;

  form: FormGroup;

  constructor(private location: Location, private route: ActivatedRoute, private router: Router,
              private rest: RestService, private fb: FormBuilder, private adopcjaServ: AdopcjaService,
              private zwierzeServ: ZwierzeService, private pdfService: PdfService) {
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
    if (this.router.url.search('dodawanie-adopcji') !== -1) {
      this.dodawanie = true;
      this.edycja = false;
      this.title = 'Dodawanie adopcji';
      this.przyciskSubmit = 'Dodaj adopcję';
      this.route.params.subscribe(params => {
        this.zwierzeServ.podajZwierze(params['id']).subscribe(res => {
          this.zwierze = res.zwierzeDTO;
          this.fotoUrl = this.rest.url + this.zwierze.fotoUrl;
        }, err => {
          console.log('Nie ma takiego zwierzęcia', err);
        });
      });
    } else {
      this.edycja = true;
      this.dodawanie = false;
      this.title = 'Edycja adopcji';
      this.przyciskSubmit = 'Edytuj adopcję';
      this.route.params.subscribe(params => {
        this.idObecnejAdopcji = params['id'];
        this.adopcjaServ.podajAdopcjePoId(params['id']).subscribe(r => {
          this.zwierze = r.adopcjaDTO.zwierzeDTO;
          this.fotoUrl = this.rest.url + this.zwierze.fotoUrl;
          this.uzupelnijPolaDoEdycji(r.adopcjaDTO);
        }, err => console.log('blad', err));
      });
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
    if (this.walidacja()) {

      const osobaAdoptujaca = new OsobaAdoptujaca();
      osobaAdoptujaca.imie = this.form.get('imie').value;
      osobaAdoptujaca.nazwisko = this.form.get('nazwisko').value;
      osobaAdoptujaca.email = this.form.get('email').value;
      osobaAdoptujaca.numerTelefonu = this.form.get('telefon').value;
      osobaAdoptujaca.kodPocztowy = this.form.get('kodPocztowy').value;
      osobaAdoptujaca.miejscowosc = this.form.get('miejscowosc').value;
      osobaAdoptujaca.nrMieszkania = this.form.get('nrMieszkania').value;
      osobaAdoptujaca.numerDowodu = this.form.get('nrDowodu').value;
      osobaAdoptujaca.seriaDowodu = this.form.get('seriaDowodu').value;
      osobaAdoptujaca.ulica = this.form.get('ulica').value;
      osobaAdoptujaca.nrDomu = this.form.get('nrDomu').value;

      if (this.dodawanie) {
        const req = new UtworzAdopcjeRequestDTO();
        req.zwierzeDTO = this.zwierze;
        req.osobaAdoptujacaDTO = osobaAdoptujaca;
        this.adopcjaServ.dodajAdopcje(req).subscribe(res => console.log('sukces dodawania', res),
            err => console.log('blad dodawania adopcji', err));
      } else if (this.edycja) {
        const req = new EdytujAdopcjeRequestDTO();
        req.osobaAdoptujacaDTO = osobaAdoptujaca;
        this.adopcjaServ.edytujAdopcje(this.idObecnejAdopcji, req).subscribe(res => {
          console.log('sukces edycji', res);
        }, err => console.log('blad edycji adopcji', err));
      }
    }
  }

  walidacja(): boolean {
    if (this.form.valid) {
      return true;
    }
    this.form.get('imie').markAsDirty();
    this.form.get('nazwisko').markAsDirty();
    this.form.get('email').markAsDirty();
    this.form.get('telefon').markAsDirty();
    this.form.get('kodPocztowy').markAsDirty();
    this.form.get('miejscowosc').markAsDirty();
    this.form.get('nrDowodu').markAsDirty();
    this.form.get('seriaDowodu').markAsDirty();
    this.form.get('nrDomu').markAsDirty();

    return false;
  }

  uzupelnijPolaDoEdycji(adopcja: Adopcja) {
    this.form.get('imie').setValue(adopcja.osobaAdoptujacaDTO.imie);
    this.form.get('nazwisko').setValue(adopcja.osobaAdoptujacaDTO.nazwisko);
    this.form.get('email').setValue(adopcja.osobaAdoptujacaDTO.email);
    this.form.get('telefon').setValue(adopcja.osobaAdoptujacaDTO.numerTelefonu);
    this.form.get('kodPocztowy').setValue(adopcja.osobaAdoptujacaDTO.kodPocztowy);
    this.form.get('miejscowosc').setValue(adopcja.osobaAdoptujacaDTO.miejscowosc);
    this.form.get('nrDowodu').setValue(adopcja.osobaAdoptujacaDTO.numerDowodu);
    this.form.get('seriaDowodu').setValue(adopcja.osobaAdoptujacaDTO.seriaDowodu);
    this.form.get('nrDomu').setValue(adopcja.osobaAdoptujacaDTO.nrDomu);
    this.form.get('ulica').setValue(adopcja.osobaAdoptujacaDTO.ulica);
    this.form.get('nrMieszkania').setValue(adopcja.osobaAdoptujacaDTO.nrMieszkania);
  }

  wyczysc() {
    this.form.reset();
  }

  usunAdopcje() {
    this.adopcjaServ.usunAdopcje(this.idObecnejAdopcji)
      .subscribe(r => {
        console.log('sukces', r);
        this.router.navigate(['/zarzadzanie-zwierzetami/lista-adopcji']);
        }, err => console.log('blad usuwania', err));
  }

  pobierzPdf() {
    this.adopcjaServ.podajAdopcjePoId(this.idObecnejAdopcji).subscribe(res => {
      this.pdfService.pobierzPdfAdopcji(res.adopcjaDTO);
    }, err => {
      console.log('błąd drukowania (serwerowy)', err);
    });
  }
}

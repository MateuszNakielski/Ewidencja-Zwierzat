import {AfterViewChecked, Component, OnInit, ViewChild} from '@angular/core';
import {Zwierze} from '../../model/zwierze';
import {ActivatedRoute, Router} from '@angular/router';
import {RestService} from '../../services/rest.service';
import {ZwierzeService} from '../../services/zwierze.service';
import {EdytujZwierzeResponse} from '../../model/rest/zwierze/edytujZwierzeResponse';
import {EdytujZwierzeRequest} from '../../model/rest/zwierze/edytujZwierzeRequest';
import {Plik} from '../../model/plik';
import {Location} from '@angular/common';
import {ConfirmationService} from 'primeng/primeng';
import {AppMessageService} from '../../services/message.service';

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
  cechy: string;
  nrCZIP: string;

  edycjaTrue = false;
  edycjaFalse = false;
  komunikatBad = 'Błąd danych formularza';

  constructor(private location: Location, private router: Router, private route: ActivatedRoute, private msgServ: AppMessageService,
              private rest: RestService, private zwServ: ZwierzeService, private confirmServ: ConfirmationService) {
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
        this.nrCZIP = this.zwierze.numerCZIP;
        this.cechy = this.zwierze.cechySzczegolne;
      }, err => {
        console.log(err);
        this.router.navigate(['/zarzadzanie-zwierzetami']);
      });
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
/*
  usunZwierze() {
    this.zwServ.usunZwierze(this.zwierze.id).subscribe(res => {
      this.router.navigate(['zarzadzanie-zwierzetami/wszystkie-zwierzeta']);
    }, err => {
      this.komunikatBad = 'Błąd serwera.';
      this.edycjaFalse = true;
    });
  }*/

  usunZwierze() {
    this.confirmServ.confirm({
      message: 'Czy na pewno chcesz usunąć zwierzę?',
      header: 'Potwierdzenie usunięcia',
      icon: 'fa fa-trash',
      accept: () => {
        this.zwServ.usunZwierze(this.zwierze.id)
          .subscribe(r => {
            this.msgServ.dodajSukces({severity:'success', summary:'Usunięcie pomyślne', detail:'Usunięto zwierzę pomyślnie.'});
            this.router.navigate(['/zarzadzanie-zwierzetami/wszystkie-zwierzeta']);
          }, err => {
            this.komunikatBad = 'Błąd serwera.';
            this.edycjaFalse = true;
            this.edycjaTrue = false;
          });
      },
      reject: () => {}
    });
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
    edyt.zwierze.numerCZIP = this.nrCZIP;
    edyt.zwierze.cechySzczegolne = this.cechy;
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
    if (!this.imie || !this.wiek || !this.gatunek || !this.rasa || !this.nrCZIP) {
      this.komunikatBad = 'Należy uzupełnić wszystkie wymagane pola formularza.';
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

  goBack() {
    this.location.back();
  }

}

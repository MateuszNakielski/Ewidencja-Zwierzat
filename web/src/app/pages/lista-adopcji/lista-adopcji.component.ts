import {Component, OnInit, ViewChild} from '@angular/core';
import {RestService} from '../../services/rest.service';
import {Adopcja} from '../../model/adopcja';
import {Location} from '@angular/common';
import {AdopcjaService} from '../../services/adopcja.service';
import {PageComponent} from '../../components/page/page.component';
import {PdfService} from '../../services/pdf.service';
import {AppMessageService} from '../../services/message.service';
import {ConfirmationService, ConfirmDialog, Message} from 'primeng/primeng';

@Component({
  selector: 'app-lista-adopcji',
  templateUrl: './lista-adopcji.component.html',
  styleUrls: ['./lista-adopcji.component.scss']
})
export class ListaAdopcjiComponent implements OnInit {
  @ViewChild(PageComponent) page;
  adopcje: Adopcja[];

  url = '';
  msgs: Message[] = [];

  constructor(private location: Location, private confirmServ: ConfirmationService, public rest: RestService,
              public adopcjaServ: AdopcjaService, public pdfService: PdfService, public msgServ: AppMessageService) {
    this.adopcje = [];
  }

  ngOnInit() {
    this.msgs = this.msgServ.podajSukcesy();
    this.url = this.rest.url;
    this.page.wczytywanie = true;
    this.adopcjaServ.podajAdopcje().subscribe(r => {
      this.adopcje = r.listaAdopcji;
      this.page.wczytywanie = false;
    }, err => console.log(err));
  }

  goBack() {
    this.location.back();
  }

  usunAdopcje(id: number) {
    this.confirmServ.confirm({
      message: 'Czy na pewno chcesz usunąć adopcję?',
      header: 'Potwierdzenie usunięcia',
      icon: 'fa fa-trash',
      accept: () => {
        this.adopcjaServ.usunAdopcje(id)
          .subscribe(r => {
            this.adopcje = this.adopcje.filter(ad => ad.id !== id);
          }, err => {
            this.msgs = [{severity:'error', summary:'Błąd', detail:'Błąd serwera'}];
          });
        this.msgs = [{severity:'success', summary:'Usunięcie pomyślne', detail:'Usunięto adopcję pomyślne'}];
      },
      reject: () => {
      }
    });

  }

  wydrukujAdopcje(adopcja: Adopcja) {
    this.pdfService.pobierzPdfAdopcji(adopcja);
  }
}

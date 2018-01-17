import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {Injectable} from '@angular/core';
import {Adopcja} from '../model/adopcja';
import * as moment from 'moment';
import {OsobaAdoptujaca} from '../model/osobaAdoptujaca';

@Injectable()
export class PdfService {

  constructor() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  podajAdres(os: OsobaAdoptujaca): string {
    let adres = '';
    adres += os.kodPocztowy + ' ' + os.miejscowosc;
    if (os.ulica) {
      adres += ', ul. ' + os.ulica;
    }
    adres += ', nr domu ' + os.nrDomu;
    if (os.nrMieszkania) {
      adres += '/' + os.nrMieszkania;
    }
    return adres;
  }

  formatujNull(tresc: string): string {
    if (tresc == null) {
      return '';
    }
    return tresc;
  }

  pobierzPdfAdopcji(adopcja: Adopcja) {
    const dd = {
      content: [
        {text:'Olsztyn, dnia ' + moment().format('DD-MM-YYYY'), style: 'data'},
        {text:'UMOWA ADOPCYJNA', style: 'header'},
        {text:'Pomiędzy:', style: 'szary'},
        'Fundacją "Człowiek dla kota"',
        {text:'A osobą adoptującą:', style: 'szary'},
        {
          style: 'podkreslenie',
          table: {
            widths: ['100%'],
            body: [
              [{text: '' + adopcja.osobaAdoptujacaDTO.imie + ' ' + adopcja.osobaAdoptujacaDTO.nazwisko, style: 'dane', border: [0, 0, 0, 1] }],
              [{text: '(imię i nazwisko osoby adoptującej)', style: 'opis', border: [0, 0, 0, 0] }],
              [{text: '' + this.podajAdres(adopcja.osobaAdoptujacaDTO), style: 'dane', border: [0, 0, 0, 1] }],
              [{text: '(adres)', style: 'opis', border: [0, 0, 0, 0] }],
              [{text: '' + adopcja.osobaAdoptujacaDTO.numerTelefonu + ', ' + adopcja.osobaAdoptujacaDTO.email, style: 'dane', border: [0, 0, 0, 1] }],
              [{text: '(numer telefonu i adres e-mail)', style: 'opis', border: [0, 0, 0, 0] }],
              [{text: '' + adopcja.osobaAdoptujacaDTO.seriaDowodu + ', ' + adopcja.osobaAdoptujacaDTO.numerDowodu, style: 'dane', border: [0, 0, 0, 1] }],
              [{text: '(seria i numer dowodu osobistego)', style: 'opis', border: [0, 0, 0, 0] }],
            ]
          }
        },
        {text:'Dane zwierzęcia:', style: 'szary'},
        {
          style: 'podkreslenie',
          table: {
            widths: ['100%'],
            body: [
              [{text: '' + adopcja.zwierzeDTO.imie, style: 'dane', border: [0, 0, 0, 1] }],
              [{text: '(imię)', style: 'opis', border: [0, 0, 0, 0] }],
              [{text: '' + adopcja.zwierzeDTO.id + ', ' + adopcja.zwierzeDTO.numerCZIP, style: 'dane', border: [0, 0, 0, 1] }],
              [{text: '(numer rejestru i numer CZIP)', style: 'opis', border: [0, 0, 0, 0] }],
              [{text: '' + adopcja.zwierzeDTO.gatunek, style: 'dane', border: [0, 0, 0, 1] }],
              [{text: '(gatunek)', style: 'opis', border: [0, 0, 0, 0] }],
              [{text: '' + adopcja.zwierzeDTO.rasa, style: 'dane', border: [0, 0, 0, 1] }],
              [{text: '(rasa)', style: 'opis', border: [0, 0, 0, 0] }],
              [{text: '' + this.formatujNull(adopcja.zwierzeDTO.cechySzczegolne), style: 'dane', border: [0, 0, 0, 1] }],
              [{text: '(cechy szczególne)', style: 'opis', border: [0, 0, 0, 0] }],
            ]
          }
        },
        {text: 'Fundacja zastrzega sobie prawo przeprowadzenia inspekcji w miejscu pobytu adoptowanego zwierzęcia, rozwiązania umowy w trybie natychmiastowym oraz zabrania zwierzęcia w przypadku stwierdzenia łamania postanowień niniejszej umowy adopcyjnej.'},
        ' ',
        {text: 'Niniejszy dokument jest zobowiązaniem adopcyjnym, a nie umową kupna - sprzedaży.'},
        ' ',
        {text: "OSOBA ADOPTUJĄCA ZOBOWIĄZUJE SIĘ:", style: 'podtytul'},
        {
          ol: [
            {text: 'Zapewnić zwierzęciu wyżywienie, wodę i bezpieczne schronienie (w przypadku psa mieszkającego na zewnątrz odpowiedniego kojca z właściwie ocieploną budą);', style: 'podpunkt'},
            {text: 'Zapewnić zwierzęciu staranną opiekę weterynaryjną (w tym szczepienia ochronne i zabiegi profilaktyczne) odpowiednio do wieku, kondycji fizycznej i stanu zdrowia zwierzęcia.', style: 'podpunkt'},
            {text: 'Nie wypuszczać zwierzęcia bez dozoru na tereny otwarte oraz do wyraźnego, widocznego oznakowania go (obroża/szelki z informacją zawierającą numer telefonu i adres właściciela zwierzęcia, itp.) poza terenem zamkniętym.', style: 'podpunkt'},
            {text: 'Udzielać placówce Fundacji informacji o przebiegu aklimatyzacji zwierzęcia w nowym domu, w sposób dogodny dla osoby adoptującej - telefonicznie, mailowo, listownie).', style: 'podpunkt'},
            {text: 'Zarejestrować zwierzę we właściwym urzędzie (jeśli jest to wymagane na terenie gminy osoby adoptującej).', style: 'podpunkt'},
            {text: 'Nie trzymać zwierzęcia na uwięzi.', style: 'podpunkt'},
            {text: 'Traktować adoptowane zwierzę godnie, z poszanowaniem oraz zgodnie z zapisami Ustawy o Ochronie Zwierząt.', style: 'podpunkt'},
            {text: 'Nie poddawać zwierzęcia eksperymentom medycznym lub jakimkolwiek innym', style: 'podpunkt'},
            {text: 'Nie odsprzedawać i nie przekazywać zwierzęcia bez wcześniejszego ustalenia ze Schroniskiem. Schronisko ma prawo do skontrolowania nowych warunków i podpisania umowy adopcyjnej z nowym opiekunem.', style: 'podpunkt'},
            {text: 'Poinformować Fundację o zaginięciu lub śmierci zwierzęcia w ciągu 48 godzin.', style: 'podpunkt'},
            {text: 'Poddania zwierzęcia zabiegowi sterylizacji/kastracji jeśli takowy nie został przeprowadzony do czasu adopcji. Warunki zabiegu określa odrębny dokument. Do czasu wykonania zabiegu właściciel zobowiązuje się nie dopuścić do rozmnożenia zwierzęcia.', style: 'podpunkt'},
            {text: 'Informować Fundację o wszelkich zmianach danych osobowych podanych podaczas adopcji', style: 'podpunkt'},
            {text: 'Umożliwić osobom upoważnionym wykonanie wizyty poadopcyjnej.', style: 'podpunkt'}
          ],
          style: 'podpunkt'

        },
        {
          style: 'podkreslenie',
          table: {
            widths: ['30%','40%','30%'],
            body: [
              [{text: ' ', border: [0, 0, 0, 0]},{text: ' ', border: [0, 0, 0, 0]}, {text: ' ', border: [0, 0, 0, 0]} ],
              [{text: ' ', border: [0, 0, 0, 0]},{text: ' ', border: [0, 0, 0, 0]}, {text: ' ', border: [0, 0, 0, 0]} ],
              [{text: ' ', border: [0, 0, 0, 0]},{text: ' ', border: [0, 0, 0, 0]}, {text: ' ', border: [0, 0, 0, 0]} ],
              [{text: ' ', border: [0, 0, 0, 0]},{text: ' ', border: [0, 0, 0, 0]}, {text: ' ', border: [0, 0, 0, 0]} ],
              [{text: ' ', border: [0, 0, 0, 0]},{text: ' ', border: [0, 0, 0, 0]}, {text: ' ', border: [0, 0, 0, 0]} ],
              [{text: ' ', border: [0, 0, 0, 0]},{text: ' ', border: [0, 0, 0, 0]}, {text: ' ', border: [0, 0, 0, 0]} ],
              [{text: ' ', border: [0, 0, 0, 0]},{text: ' ', border: [0, 0, 0, 0]}, {text: ' ', border: [0, 0, 0, 0]} ],
              [{text: ' ', border: [0, 0, 0, 0]},{text: ' ', border: [0, 0, 0, 0]}, {text: ' ', border: [0, 0, 0, 0]} ],
              [{text: ' ', border: [0, 0, 0, 0]},{text: ' ', border: [0, 0, 0, 0]}, {text: ' ', border: [0, 0, 0, 0]} ],
              [{text: ' ', border: [0, 0, 0, 0]},{text: ' ', border: [0, 0, 0, 0]}, {text: ' ', border: [0, 0, 0, 0]} ],
              [{text: '(podpis pracownika fundacji)', style: 'opisLewo', border: [0, 1, 0, 0] },
                { text: ' ', border: [0, 0, 0, 0] },
                {text: '(podpis osoby dokonującej adopcji)', style: 'opisPrawo', border: [0, 1, 0, 0] }],
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 22,
          margin: 18,
          bold: true,
          alignment: 'center'
        },
        bigger: {
          fontSize: 15,
          italics: true
        },
        data: {
          alignment: 'right'
        },
        szary: {
          color: 'gray',
          italics: true,
          margin: 8
        },
        dane: {
          alignment: 'center',
          fontSize: 14,
          margin: 7
        },
        opis: {
          fontSize: 8,
          alignment: 'center',
          margin: 7
        },
        opisLewo: {
          fontSize: 8,
          alignment: 'left',
          margin: 7
        },
        opisPrawo: {
          fontSize: 8,
          alignment: 'right',
          margin: 7
        },
        podtytul: {
          bold: true,
          color: 'gray',
          fontSize: 12,
          italics: true
        },
        podpunkt: {
          margin: 3
        }
      },
      defaultStyle: {
        columnGap: 20
      }
    };

    pdfMake.createPdf(dd).download('Adopcja_nr' + adopcja.id);
  }


}

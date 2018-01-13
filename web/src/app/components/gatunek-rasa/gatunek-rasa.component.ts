import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'app-gatunek-rasa',
  templateUrl: './gatunek-rasa.component.html',
  styleUrls: ['./gatunek-rasa.component.scss']
})
export class GatunekRasaComponent implements OnInit {

  rasy = [];
  gatunki = ['', 'Kot', 'Pies'];
  rasyKotow = ['', 'Syberyjski', 'Brytyjski', 'Rosyjski niebieski', 'Syjamski', 'Domowy długowłosy', 'Egipski mau'];
  rasyPsow = ['', 'Owczarek', 'Jamnik', 'Doberman', 'Beagle', 'Husky syberyjski'];

  @Output() onWyborGatunku = new EventEmitter();
  @Output() onWyborRasy = new EventEmitter();
  @Input() mozliwyNull = true;
  @Input() label = true;
  @Input() labelClass = 'col-sm-3';
  @Input() inputClass = 'col-sm-9';
  @Input() wybranyGatunek = '';
  @Input() wybranaRasa = '';

  constructor(private stateServ: StateService) { }

  ngOnInit() {
    this.stateServ.podajObecnyStan().subscribe(s => {
      if (s === 'inputClear') {
        this.wybranyGatunek = '';
        this.wybranaRasa = '';
        this.ustawRasy();
        this.onWyborGatunku.emit('');
        this.onWyborRasy.emit('');
      }
    });

    if (!this.mozliwyNull) {
      this.gatunki = this.gatunki.slice(1, this.gatunki.length);
      this.rasyKotow = this.rasyKotow.slice(1, this.rasyKotow.length);
      this.rasyPsow = this.rasyPsow.slice(1, this.rasyPsow.length);
    }

    this.ustawRasy();
  }

  ustawRasy() {
    if (this.wybranyGatunek === 'Pies') {
      this.rasy = this.rasyPsow;
    } else if (this.wybranyGatunek === 'Kot') {
      this.rasy = this.rasyKotow;
    } else {
      this.rasy = [];
    }
  }

  onSelectGatunek(poleGatunek) {
    this.wybranyGatunek = poleGatunek.target.value;
    this.onWyborGatunku.emit(this.wybranyGatunek);
    this.ustawRasy();
  }

  onSelectRasa(poleRasa) {
    this.onWyborRasy.emit(poleRasa.target.value);
  }

}

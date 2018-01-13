import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit {
  @Input() placeHolder = '';
  @Input() wartoscPoczatkowa = '';
  wartosc: string;
  @Output() onTextInput = new EventEmitter();
  constructor(private stateServ: StateService) {
    this.wartosc = this.wartoscPoczatkowa;
  }

  ngOnInit() {
    this.stateServ.podajObecnyStan().subscribe(stan => {
      if (stan === 'inputClear') {
        this.onTextInput.emit('');
        this.wartosc = '';
      }
    });
  }

  onInput(textInput) {
    this.onTextInput.emit(textInput.target.value);
  }

}

import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FileService} from '../../services/file.service';
import {Plik} from '../../model/plik';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  @Output() onChangeFile = new EventEmitter();
  @Input() maly = false;

  wybrane: string;

  constructor(private fileServ: FileService, private stanServ: StateService) { }

  ngOnInit() {
    this.stanServ.podajObecnyStan().subscribe(s => {
      if (s === 'inputClear') {
        this.wybrane = null;
        this.fileInput.nativeElement.files = null;
        this.onChangeFile.emit(null);
      }
    });
  }

  upload() {
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const blob = fileBrowser.files[0];
      this.wybrane = blob.name;
      this.fileServ.blob2base64(blob).then( () => {
        this.onChangeFile.emit(new Plik(blob.name, this.obetnijDoPrzecinka(this.fileServ.podajFileReader().result)));
      });
    }
  }

  obetnijDoPrzecinka(text: string): string {
    text = text.slice(text.search(',') + 1, text.length);
    return text;
  }


}

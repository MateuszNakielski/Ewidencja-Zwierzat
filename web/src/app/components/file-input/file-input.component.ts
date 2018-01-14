import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FileService} from '../../services/file.service';
import {Plik} from '../../model/plik';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  @Output() onChangeFile = new EventEmitter();
  @Input() maly = false;
  constructor(private fileServ: FileService) { }

  ngOnInit() {
  }

  upload() {
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const blob = fileBrowser.files[0];
      console.log(blob);
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

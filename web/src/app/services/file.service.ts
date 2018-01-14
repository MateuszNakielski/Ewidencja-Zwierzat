import {Injectable} from '@angular/core';

@Injectable()
export class FileService {
  reader: FileReader;

  constructor() {
    this.reader = new FileReader();
  }

  podajFileReader() {
    return this.reader;
  }

  blob2base64(blob: Blob): Promise<ProgressEvent> {
    return new Promise<ProgressEvent>(res => {
      this.reader.onloadend = res;
      this.reader.readAsDataURL(blob);
    });
  }
}

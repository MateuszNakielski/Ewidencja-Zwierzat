import {Injectable} from '@angular/core';

@Injectable()
export class RestService {

  url = 'http://localhost:8080/';

  constructor() {
  }

  wsadzParametryDoUrl(url, param): string {
    let first = true;
    for(let i in param) {
      if (param[i] != null) {
        if (first) url += '?' + i + '=' + param[i];
        else url += '&' + i + '=' + param[i];
      }
      first = false;
    }
    return url;
  }

}

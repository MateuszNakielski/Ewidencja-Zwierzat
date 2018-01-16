import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {HttpClient} from '@angular/common/http';
import {ZwierzeParam} from '../model/zwierzeParam';
import {RestService} from './rest.service';
import {Zwierze} from '../model/zwierze';
import {PobierzZwierzetaResponse} from '../model/rest/zwierze/pobierzZwierzetaResponse';
import {PobierzZwierzeResponse} from '../model/rest/zwierze/pobierzZwierzeResponse';
import {UtworzZwierzeRequest} from '../model/rest/zwierze/utworzZwierzeRequest';
import {UtworzZwierzeResponse} from '../model/rest/zwierze/utworzZwierzeResponse';
import {EdytujZwierzeResponse} from '../model/rest/zwierze/edytujZwierzeResponse';
import {EdytujZwierzeRequest} from '../model/rest/zwierze/edytujZwierzeRequest';
import {PobierzAdopcjeResponse} from '../model/rest/adopcja/pobierzAdopcjeResponse';
import {PobierzAdopcjePoIdResponse} from '../model/rest/adopcja/pobierzAdopcjePoIdResponse';
import {UtworzAdopcjeRequestDTO} from '../model/rest/adopcja/utworzAdopcjeRequest';
import {UtworzAdopcjeResponseDTO} from '../model/rest/adopcja/utworzAdopcjeResponse';
import {EdytujAdopcjeRequestDTO} from '../model/rest/adopcja/edytujAdopcjeRequest';

@Injectable()
export class AdopcjaService {

  urlAdopcja = this.rest.url + 'adopcja';

  constructor(private http: HttpClient, private rest: RestService) { }

  podajAdopcje(): Observable<PobierzAdopcjeResponse> {
    return this.http.get<PobierzAdopcjeResponse>(this.urlAdopcja);
  }

  podajAdopcjePoId(id: number): Observable<PobierzAdopcjePoIdResponse> {
    const url = this.urlAdopcja + '/' + id;
    return this.http.get<PobierzAdopcjePoIdResponse>(url);
  }

  usunAdopcje(id: number) {
    const url = this.urlAdopcja + '/' + id;
    return this.http.delete(url);
  }

  dodajAdopcje(utworzAdopcjeRequest: UtworzAdopcjeRequestDTO): Observable<UtworzAdopcjeResponseDTO> {
    return this.http.post<UtworzAdopcjeResponseDTO>(this.urlAdopcja, utworzAdopcjeRequest);
  }

  edytujAdopcje(id: number, edytujAdopcjeRequest: EdytujAdopcjeRequestDTO): Observable<EdytujZwierzeResponse> {
    return this.http.put<EdytujZwierzeResponse>(this.urlAdopcja + '/' + id, edytujAdopcjeRequest);
  }




}

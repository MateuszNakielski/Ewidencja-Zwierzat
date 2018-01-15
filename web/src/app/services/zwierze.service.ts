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

@Injectable()
export class ZwierzeService {

  urlZwierze = this.rest.url + 'zwierze';

  constructor(private http: HttpClient, private rest: RestService) { }

  podajZwierzeta(param: ZwierzeParam = new ZwierzeParam()): Observable<PobierzZwierzetaResponse> {
    const url = this.rest.wsadzParametryDoUrl(this.urlZwierze, param);
    return this.http.get<PobierzZwierzetaResponse>(url);
  }

  podajZwierze(id: number): Observable<PobierzZwierzeResponse> {
    const url = this.urlZwierze + '/' + id;
    return this.http.get<PobierzZwierzeResponse>(url);
  }

  usunZwierze(id: number) {
    const url = this.urlZwierze + '/' + id;
    return this.http.delete(url);
  }

  dodajZwierze(utworzZwierzeRequest: UtworzZwierzeRequest): Observable<UtworzZwierzeResponse> {
    return this.http.post<UtworzZwierzeResponse>(this.urlZwierze, utworzZwierzeRequest);
  }

  edytujZwierze(edytujZwierzeRequest: EdytujZwierzeRequest): Observable<EdytujZwierzeResponse> {
    return this.http.put<EdytujZwierzeResponse>(this.urlZwierze + '/' + edytujZwierzeRequest.zwierze.id, edytujZwierzeRequest);
  }




}

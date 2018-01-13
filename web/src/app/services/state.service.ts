import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class StateService {

  stateSub = new BehaviorSubject('start');

  constructor() { }

  ustawStan(stan: string) {
    this.stateSub.next(stan);
  }

  podajObecnyStan(): Observable<string> {
    return this.stateSub;
  }

}

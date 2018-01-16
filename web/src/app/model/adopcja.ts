import {OsobaAdoptujaca} from './osobaAdoptujaca';
import {Zwierze} from './zwierze';

export class Adopcja {
  id: number;
  osobaAdoptujacaDTO: OsobaAdoptujaca;
  zwierzeDTO: Zwierze;
  constructor() {
    this.id = 1;
  }
}

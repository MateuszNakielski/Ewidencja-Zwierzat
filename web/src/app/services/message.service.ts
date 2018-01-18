import {Injectable} from '@angular/core';
import {Message} from 'primeng/primeng';

@Injectable()
export class AppMessageService {

  private bledy: Message[] = [];
  private sukcesy: Message[] = [];
  public adopcjaDodanieSukces: Message = {severity:'success', summary:'Dodano adopcję', detail:'Adopcja została przekazana do listy adopcji.'};
  constructor() {

  }

  public podajBledy(): Message[] {
     const b = this.bledy;
     this.bledy = [];
     return b;
  }

  public podajSukcesy(): Message[] {
    const s = this.sukcesy;
    this.sukcesy = [];
    return s;
  }

  public dodajBlad(msg: Message) {
    this.bledy.push(msg);
  }

  public dodajSukces(msg: Message) {
    this.sukcesy.push(msg);
  }

}

export class Zwierze {
  public gatunek: string;
  public rasa: string;
  public imie: string;
  public wiek: number;
  public nr: number;
  public img: string;
  public opis: string;

  constructor() {
    this.nr = 12;
    this.gatunek = 'kot';
    this.imie = 'Halinka';
    this.rasa = 'Nebelung';
    this.wiek = 4;
    this.img = '';
  }
}

export class Plik {
  public fileContent: string;
  public fileName: string;
  constructor(fName: string, fContent: string) {
    this.fileName = fName;
    this.fileContent = fContent;
  }
}

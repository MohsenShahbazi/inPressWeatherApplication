export class ListJModel {
  private _listModel: any[];
  private _total: number;


  constructor() {
    this._listModel = [];
    this._total = 0;
  }

  get listModel(): any[] {
    return this._listModel;
  }

  set listModel(value: any[]) {
    this._listModel = value;
  }


  get total(): number {
    return this._total;
  }

  set total(value: number) {
    this._total = value;
  }
}

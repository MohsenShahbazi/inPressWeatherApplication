export class ParamToDialogModel {
  private _dataModel: any;
  private _formMode: string;


  constructor() {
    this._dataModel = {};
    this._formMode = "";
  }

  get dataModel(): any {
    return this._dataModel;
  }

  set dataModel(value: any) {
    this._dataModel = value;
  }


  get formMode(): string {
    return this._formMode;
  }

  set formMode(value: string) {
    this._formMode = value;
  }
}

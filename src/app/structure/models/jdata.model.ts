export class JdataModel {
  private _message: any;

  constructor(message: any){
    this._message = message;
  }


  get message(): any {
    return this._message;
  }
}

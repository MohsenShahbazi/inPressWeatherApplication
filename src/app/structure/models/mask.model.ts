export class MaskModel {
  private _read: boolean;
  private _edit: boolean;
  private _create: boolean;
  private _delete: boolean;
  private _print: boolean;
  private _scan: boolean;
  private _upload: boolean;
  private _download: boolean;
  private _Administrator: boolean;


  constructor() {
    this._read = false;
    this._edit = false;
    this._create = false;
    this._delete = false;
    this._print = false;
    this._scan = false;
    this._upload = false;
    this._download = false;
    this._Administrator = false;
  }

  get edit(): boolean {
    return this._edit;
  }

  set edit(value: boolean) {
    this._edit = value;
  }

  get create(): boolean {
    return this._create;
  }

  set create(value: boolean) {
    this._create = value;
  }

  get delete(): boolean {
    return this._delete;
  }

  set delete(value: boolean) {
    this._delete = value;
  }

  get print(): boolean {
    return this._print;
  }

  set print(value: boolean) {
    this._print = value;
  }

  get scan(): boolean {
    return this._scan;
  }

  set scan(value: boolean) {
    this._scan = value;
  }

  get upload(): boolean {
    return this._upload;
  }

  set upload(value: boolean) {
    this._upload = value;
  }

  get download(): boolean {
    return this._download;
  }

  set download(value: boolean) {
    this._download = value;
  }

  get Administrator(): boolean {
    return this._Administrator;
  }

  set Administrator(value: boolean) {
    this._Administrator = value;
  }

  get read(): boolean {
    return this._read;
  }

  set read(value: boolean) {
    this._read = value;
  }
}

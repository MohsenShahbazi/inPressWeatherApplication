import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  rout: string = '';
  addOnResourceUrl: string = '';
  page: number = 1;
  limit: number = 50;


  add(model: any): any {
    return this.http.post(this.authService.getResourceUrl((this.addOnResourceUrl !== null ? this.addOnResourceUrl : null)) + this.rout + 'add', model, {});
  }

  update(model: any) {
    return this.http.post(this.authService.getResourceUrl((this.addOnResourceUrl !== null ? this.addOnResourceUrl : null)) + this.rout + 'update', model, {});
  }

  delete(id: number) {
    let params = new HttpParams();
    params = params.set('id', id);
    return this.http.delete(this.authService.getResourceUrl((this.addOnResourceUrl !== null ? this.addOnResourceUrl : null)) + this.rout + 'delete', {params: params});
  }

  get(id: number): any {
    let params = new HttpParams().set('id', id);
    return this.http.get(this.authService.getResourceUrl((this.addOnResourceUrl !== null ? this.addOnResourceUrl : null)) + this.rout + 'get', {params: params});
  }


  //for internal pagination
  getAll() {
    return this.http.get(this.authService.getResourceUrl((this.addOnResourceUrl !== null ? this.addOnResourceUrl : null)) + this.rout + 'list');
  }

  //for external pagination
  getList(start: number, limit: number, sortValue: string = '', sortDir: boolean = true) {
    let params = new HttpParams();
    params = params.set('start', start);
    params = params.set('limit', limit);
    if (sortValue != '') {
      params = params.set('sort', sortValue);
    }
    params = sortDir ? params.set('sort_dir', 'asc') : params.set('sort_dir', 'desc');
    return this.http.get(this.authService.getResourceUrl((this.addOnResourceUrl !== null ? this.addOnResourceUrl : null)) + this.rout + `list`, {params: params});
  }


}

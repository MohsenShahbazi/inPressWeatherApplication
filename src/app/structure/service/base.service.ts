import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  rout: string;
  addOnResourceUrl: string;
  page: number = 1;
  pageSize: number = 50;
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  changeMessage(message: any) {
    this.messageSource.next(message);
  }

  private employee = new Subject<any>();
  employeeStatus = this.employee.next();

  changeEmployeeStatus(employee: any) {
    this.employeeStatus = employee;
  }

  private comment = new Subject<any>();
  commentStatus = this.comment.next();

  changeCommentStatus(comment: any) {
    this.commentStatus = comment;
  }


  add(model): any {
    return this.http.post(this.authService.getResourceUrl((this.addOnResourceUrl !== null ? this.addOnResourceUrl : null)) + this.rout + '/add', model, {});
  }

  getList(model = null): any {
    return this.http.post(this.authService.getResourceUrl((this.addOnResourceUrl !== null ? this.addOnResourceUrl : null)) + this.rout + '/getList', model, {});
  }

  list(model = null): any {
    return this.http.post(this.authService.getResourceUrl((this.addOnResourceUrl !== null ? this.addOnResourceUrl : null)) + this.rout + '/list', model, {});
  }

  get(id): any {
    let params = new HttpParams().set('id', id);
    return this.http.post(this.authService.getResourceUrl((this.addOnResourceUrl !== null ? this.addOnResourceUrl : null)) + this.rout + '/get', {}, {params: params});
  }

  getWebsiteList(model): any {
    return this.http.post(this.authService.getResourceUrl((this.addOnResourceUrl !== null ? this.addOnResourceUrl : null)) + this.rout + '/getWebsiteList', model, {});
  }

  search(model): any {
    return this.http.post(this.authService.getResourceUrl((this.addOnResourceUrl !== null ? this.addOnResourceUrl : null)) + this.rout + '/search', model, {});
  }


  searchPackagePlaning(model): any {
    return this.http.post(this.authService.getResourceUrl((this.addOnResourceUrl !== null ? this.addOnResourceUrl : null)) + this.rout + '/searchPackagePlaning', model, {});
  }

  autocomplete(): any {
    return this.http.post(this.authService.getResourceUrl((this.addOnResourceUrl !== null ? this.addOnResourceUrl : null)) + this.rout + '/autocomplete', {}, {});
  }

  generateCaptcha(): any {
    return this.http.post(this.authService.getResourceUrl((this.addOnResourceUrl !== null ? this.addOnResourceUrl : null)) + this.rout + '/generateCaptcha', {}, {});
  }

  register(model): any {
    return this.http.post(this.authService.getResourceUrl((this.addOnResourceUrl !== null ? this.addOnResourceUrl : null)) + this.rout + '/register', model, {});
  }

  website(model): any {
    return this.http.post(this.authService.getResourceUrl((this.addOnResourceUrl !== null ? this.addOnResourceUrl : null)) + this.rout + '/website', model, {});
  }

  sendMessageGsm(id): any {
    let params = new HttpParams().set('id', id);
    return this.http.post(this.authService.getResourceUrl((this.addOnResourceUrl !== null ? this.addOnResourceUrl : null)) + this.rout + '/sendMessageGsm', {}, {params: params});
  }


  getEnums(): any {
    return this.http.post(this.authService.getResourceUrl((this.addOnResourceUrl !== null ? this.addOnResourceUrl : null)) + this.rout + '/getEnums', {}, {});
  }

  getExistRooms(packagePlaningId, packageId): any {
    let params = new HttpParams();
    params = params.set('packagePlaningId', packagePlaningId);
    params = params.set('packageId', packageId);
    return this.http.post(this.authService.getResourceUrl((this.addOnResourceUrl !== null ? this.addOnResourceUrl : null)) + this.rout + '/getExistRooms', {}, {params: params});
  }

  getOfficePrice(packageId, packageUnitLimitId, targetSocietyId): any {
    let params = new HttpParams();
    params = params.set('packageId', packageId);
    params = params.set('packageUnitLimitId', packageUnitLimitId);
    params = params.set('targetSocietyId', targetSocietyId);
    return this.http.post(this.authService.getResourceUrl((this.addOnResourceUrl !== null ? this.addOnResourceUrl : null)) + this.rout + '/office/getPrice', {}, {params: params});
  }

  getReserve(id): any {
    let params = new HttpParams();
    params = params.set('id', id);
    return this.http.post(this.authService.getResourceUrl((this.addOnResourceUrl !== null ? this.addOnResourceUrl : null)) + this.rout + '/getReserve', {}, {params: params});
  }


  getSettlementId(settlementId): any {
    let params = new HttpParams().set('settlementId', settlementId);
    return this.http.post(this.authService.getResourceUrl((this.addOnResourceUrl !== null ? this.addOnResourceUrl : null)) + this.rout + '/get', {}, {params: params});
  }

  getReserveList(model): any {
    return this.http.post(this.authService.getResourceUrl((this.addOnResourceUrl !== null ? this.addOnResourceUrl : null)) + this.rout + '/getReserveList', model, {});
  }

  getReservationList(model): any {
    return this.http.post(this.authService.getResourceUrl((this.addOnResourceUrl !== null ? this.addOnResourceUrl : null)) + this.rout + '/getReservationList', model, {});
  }


  getReserveExcel(model): any {
    return this.http.post(this.authService.getResourceUrl((this.addOnResourceUrl !== null ? this.addOnResourceUrl : null)) + this.rout + '/getReserveExcel', model, {});
  }

  getReserveListExcel(model): any {
    return this.http.post(this.authService.getResourceUrl((this.addOnResourceUrl !== null ? this.addOnResourceUrl : null)) + this.rout + '/getReserveListExcel', model, {});
  }

  cancel(id): any {
    let params = new HttpParams();
    params = params.set('id', id);
    return this.http.post(this.authService.getResourceUrl((this.addOnResourceUrl !== null ? this.addOnResourceUrl : null)) + this.rout + '/cancel', {}, {params: params});
  }

  cancelJahangadri(id): any {
    let params = new HttpParams();
    params = params.set('bookingId', id);
    return this.http.post(this.authService.getResourceUrl((this.addOnResourceUrl !== null ? this.addOnResourceUrl : null)) + this.rout + '/cancel', {}, {params: params});
  }

  updateCost(residenceDeclarationCost: any, id: any): any {
    let params = new HttpParams();
    params = params.set('residenceDeclarationCost', residenceDeclarationCost)
      .set('id', id);
    return this.http.post(this.authService.getResourceUrl((this.addOnResourceUrl !== null ? this.addOnResourceUrl : null)) + this.rout + '/update', {}, {params: params});
  }
}

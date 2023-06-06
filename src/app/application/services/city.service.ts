import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../structure/auth/auth.service";
import {BaseService} from "../../structure/service/base.service";

@Injectable({
  providedIn: 'root'
})
export class CityService extends BaseService {

  constructor(http: HttpClient, authService: AuthService) {
    super(http, authService);
    this.rout = 'city/';
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../structure/auth/auth.service";
import {BaseService} from "../../structure/service/base.service";

@Injectable({
  providedIn: 'root'
})
export class CityService {
  rout: string = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities/';

  constructor(public http: HttpClient, public authService: AuthService) {
  }


  getAll(): any {
    return this.http.get(this.rout);
  }
}

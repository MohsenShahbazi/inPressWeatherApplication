import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {AuthService} from "../../structure/auth/auth.service";
import {BaseService} from "../../structure/service/base.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WeatherService extends BaseService {
  weatherData$ = new Subject();

  constructor(http: HttpClient, authService: AuthService, public localHttpHttpClient: HttpClient, public localAuthService: AuthService) {
    super(http, authService);
    this.rout = 'https://api.openweathermap.org/data/2.5/weather';
  }

  getAllWeather(lat: string, lon: string): any {
    let params = new HttpParams();
    params = params.set('lat', lat);
    params = params.set('lon', lon);
    params = params.set('exclude', 'current');
    params = params.set('appid', '162cb01c58ab47b7da9889b0836cad03');
    return this.localHttpHttpClient.get(this.rout, {params: params});
  }

}

import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie';
import {AuthService} from "../auth/auth.service";
import {CommonService} from "../service/common.service";
import {TranslateService} from '@ngx-translate/core';
@Injectable()
export class HttpConfigInterceptorInterceptor implements HttpInterceptor {
  token: string = '';

  constructor(
    private cookieService: CookieService,
    private authService: AuthService,
    private commonService: CommonService,
    private translate: TranslateService
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request);
  }
}

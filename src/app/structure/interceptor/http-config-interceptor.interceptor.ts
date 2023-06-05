import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import {AuthService} from "../auth/auth.service";
import {CommonService} from "../service/common.service";
import {TranslateService} from '@ngx-translate/core';
import {Observable, throwError, TimeoutError} from 'rxjs';
import {map, catchError, timeout} from 'rxjs/operators';
import {TimeoutTime} from "../constant/timeOutTime";

@Injectable()
export class HttpConfigInterceptorInterceptor implements HttpInterceptor {
  token: string = '';

  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private translate: TranslateService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.authService.getToken();
    if (token) {
      request = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + token)});
    }
    return next.handle(request).pipe(timeout(TimeoutTime),
      map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (event.status == 200) {
              event = event.clone({body: event.body.data});
              return event;
            }

          }
        }
      ),
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 400 : {
            this.commonService.showErrorMessage(this.translate.instant('badRequestMessage').toString(), error.status.toString());
            break;
          }
          case 401 : {
            if (!(error.url?.match('logout') || error.url?.match('user'))) {
              this.commonService.showErrorMessage(this.translate.instant('unAuthorizeMessage').toString(), error.status.toString());
            }
            break;
          }
          case 403 : {
            this.commonService.showErrorMessage(this.translate.instant('forbidenMessage').toString(), error.status.toString());
            break;
          }
          case 404 : {
            this.commonService.showErrorMessage(this.translate.instant('notFoundMessage').toString(), error.status.toString());
            break;
          }
          case 500 : {
            this.commonService.showMessage(this.translate.instant('internalServerMessage').toString(), error.status.toString());
            this.authService.getUser(true);
            break;
          }
          case 503 : {
            this.commonService.showMessage(this.translate.instant('methodNotAllowedMessage').toString(), error.status.toString());
            break;
          }
          case 555 : {
            this.commonService.showMessage(error.error.message.desc, error.status.toString());
            break;
          }
          case 302 : {
            this.commonService.showMessage(this.translate.instant('internalServerMessage').toString(), error.status.toString());
            this.authService.getUser(true);
            break;
          }
          case 0 : {
            if (error.error.message != undefined && error.error.message.invalids != undefined) {
              return throwError(error.error.message.invalids);
            } else {
              if (error.url?.match('logout')) {
                console.error('logout');
              } else {
                this.commonService.showMessage(this.translate.instant('internalServerMessage').toString(), null);
                this.authService.getUser(true);
              }
            }
            break;
          }
          default : {
            let timeoutError: TimeoutError = <any>error;
            if (timeoutError.name == 'TimeoutError') {
              this.commonService.showMessage('No response was received from the server', null);
            } else if (error.url?.match('logout')) {
              console.error('logout');
            } else {
              this.commonService.showMessage(this.translate.instant('internalServerMessage').toString(), error.status.toString());
            }
            break;
          }
        }
        return throwError(error);
      }));
  }
}

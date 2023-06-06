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
import {ToastrService} from "ngx-toastr";
import * as _ from 'lodash';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  token: string = '';

  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private translate: TranslateService,
    private toastr: ToastrService,
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    let token = this.authService.getToken();
    let headers = {
      'X-RapidAPI-Key': '5f51a30ce6msha918430614bf997p163518jsn73732ad25a2d',
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
    if (token) {
      request = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + token)});
    }
    if (request?.url.includes('rapidapi')) {
      request = request.clone({
        headers: request.headers.set('X-RapidAPI-Key', '5f51a30ce6msha918430614bf997p163518jsn73732ad25a2d')
      });
      request = request.clone({
        headers: request.headers.set('X-RapidAPI-Host', 'wft-geo-db.p.rapidapi.com')
      });
    }

    return next.handle(request).pipe(
      timeout(TimeoutTime),
      map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (event.status == 200) {
              /* switch (event.body.Status) {
                 case 0 : {
                   if (event.body.message.total == undefined || event.body.message.total == -1) {
                     event = event.clone({
                       body: event.body.message.data
                     });
                   } else {
                     event = event.clone({
                       body: {listModel: event.body.message.data, total: event.body.message.total}
                     });
                   }
                   return event;
                   break;
                 }
                 case 1 : {
                   _.forEach(event.body.message.invalids, (item) => {
                     this.commonService.showErrorMessage(item.message, item['field'].toString());
                   });
                   let data: any = {
                     error: event.body,
                     headers: event.headers,
                     status: event.body.message.code,
                     statusText: event.body.message.desc,
                     url: event.url
                   };
                   throw new HttpErrorResponse(data);
                   break;
                 }
                 case 2 : {
                   this.commonService.showErrorMessage(event.body.message.desc, event.body.message.code);
                   let data: any = {
                     error: event.body,
                     headers: event.headers,
                     status: event.body.message.code,
                     statusText: event.body.message.desc,
                     url: event.url
                   };
                   throw new HttpErrorResponse(data);
                   break;
                 }
                 default : {
                   return event;
                   break;
                 }
               }*/

              return event;
            }

          }
        }
      ),
      catchError((error: HttpErrorResponse): any => {
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
                this.commonService.showMessage(this.translate.instant('internalServerMessage').toString(), '');
                this.authService.getUser(true);
              }
            }
            break;
          }
          default : {
            let timeoutError: TimeoutError = <any>error;
            if (timeoutError.name == 'TimeoutError') {
              this.commonService.showMessage('No response was received from the server', '');
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


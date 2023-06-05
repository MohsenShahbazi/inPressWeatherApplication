import {Injectable, isDevMode} from '@angular/core';
import {Location} from '@angular/common';
import {WindowService} from './window.service';
import {HttpClient} from '@angular/common/http';

import * as _ from 'lodash';
import {MaskModel} from '../models/mask.model';
import {Router} from '@angular/router';
import {Observable, of, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {CommonService} from '../service/common.service';
import {CookieService} from "ngx-cookie-service";

@Injectable(
  {
    providedIn: 'root',
  }
)
export class AuthService {
  private confUrl: string = '';
  public isShowTicketDialog: boolean = false;
  private clientId: string = '';
  private clientScope: string = '';
  private principalInfo: any = {};
  private userName: string = '';
  private firstName: string = '';
  private lastName: string = '';
  private authenticated: boolean = false;
  private roleList: any[] = [];
  private authenticationServerUrl: string = '';
  private oAuthLogoutUrl: string = '';
  private oAuthCallbackUrl: string = '';
  private oAuthUserUrl: string = '';
  private oAuthTokenUrl: string = '';
  private resourceUrl: string = '';
  private authorizeUrl: string = '';
  private authorizationUrl: string = '';
  private configUrls: any;
  private token: string | undefined;
  private href: string = '';
  private expires: any = 0;
  private maskModel: MaskModel = new MaskModel();
  private subject = new Subject<any>();
  private subjectPrincipal = new Subject<any>();
  private subjectExpires = new Subject<any>();

  public requestData: any = {};
  isCallGetSessionTimeout: boolean = false;

  constructor(
    private location: Location,
    private windows: WindowService,
    private http: HttpClient,
    private cookieService: CookieService,
    private commonService: CommonService,
    private router: Router
  ) {

  }

  getToken() {
    return this.token;
  }

  public isAuthenticated(): Observable<boolean> {
    return of(this.authenticated);
  }

  get getMask(): MaskModel {
    return this.maskModel;
  }

  getUserName() {
    return this.userName;
  }

  getPrincipalInfo(): Observable<any> {
    return this.subjectPrincipal.asObservable();
  }

  getName() {
    return this.firstName + ' ' + this.lastName;
  }

  getExpires(): Observable<any> {
    return this.subjectExpires.asObservable();
  }

  getSessionTimeout(time: any) {
    if (time == undefined) {
      return;
    } else {
      if (time == 10 && !this.isCallGetSessionTimeout) {
        this.isCallGetSessionTimeout = true;
        this.getSessionTime().subscribe((info: any) => {
          this.isCallGetSessionTimeout = false;
          this.expires = info['data'];
          if (this.expires !== undefined) {
            this.subjectExpires.next({expires: info['data']});
            this.cookieService.set('expires', this.expires.toString());
          }
        });
      } else {
        this.subjectExpires.next({expires: time});
      }
    }
  }

  getSessionTime() {
    return this.http.post(this.getAuthorizationUrl() + '/login/getSessionTimeout', {});
  }

  checkLogin() {
    this.href = JSON.parse(JSON.stringify(window.location['href']));
    this.confUrl = (isDevMode() ? 'assets/config/dev.conf.json' : 'assets/config/prod.conf.json');
    this.href = window.location['href'];
    this.http.get(this.confUrl).pipe(map(res => res))
      .subscribe((config: any): any => ({
        next: () => {
          this.clientId = config['clientId'];
          this.clientScope = config['clientScope'];
          this.authenticationServerUrl = config['authenticationServerUrl'];
          this.oAuthCallbackUrl = config['oAuthCallbackUrl'];
          this.oAuthLogoutUrl = config['oAuthLogoutUrl'];
          this.resourceUrl = config['resourceUrl'];
          this.authorizeUrl = config['authorizeUrl'];
          this.authorizationUrl = config['authorizationUrl'];
          this.oAuthUserUrl = this.authenticationServerUrl + '/user';
          this.oAuthTokenUrl = this.authenticationServerUrl + '/oauth/authorize?redirect_uri=' + this.oAuthCallbackUrl +
            '&response_type=token&client_id=' + this.clientId + '&scope=' + this.clientScope;
          this.configUrls = config;
          if (this.cookieService.get('access-token')) {
            this.token = this.cookieService.get('access-token');
            this.expires = Number(this.cookieService.get('expires'));
            this.authenticated = true;
            this.router.navigate(['/home']);
            if (opener != null) {
              opener.location.reload();
              self.close();
            }
          } else {
            if (this.href != null) {
              const re = /access_token=(.*)/;
              const found = this.href.match(re);
              if (found) {
                const parsed = this.parse(this.href.substr(_.indexOf([this.href], '#')));
                this.token = parsed.access_token;
                if (this.getToken()) {
                  this.authenticated = true;
                  this.cookieService.set('access-token', <string>this.getToken());
                  this.router.navigate(['/home']);
                  if (opener != null) {
                    opener.location.reload();
                    self.close();
                  }
                }
              }
            }
          }
        },
        error: (err: any) => {
          console.error('config file not found : ', err);
        }
      }));
  }

  getResourceUrl(url?: any) {
    if (url == undefined || url == null || url == '') {
      return this.resourceUrl;
    } else {
      return this.configUrls[url];
    }
  }

  getAuthorizationUrl() {
    return this.authorizationUrl;
  }

  getResource() {
    this.confUrl = (isDevMode() ? 'assets/config/dev.conf.json' : 'assets/config/prod.conf.json');
    this.http.get(this.confUrl)
      .pipe(map(res => res))

      .subscribe((config: any): any => ({
        next: () => {
          this.oAuthLogoutUrl = config['oAuthLogoutUrl'];
          this.resourceUrl = config['resourceUrl'];
          this.authorizeUrl = config['authorizeUrl'];
          this.authorizationUrl = config['authorizationUrl'];
          this.clientId = config['clientId'];
          this.clientScope = config['clientScope'];
          this.authenticationServerUrl = config['authenticationServerUrl'];
          this.oAuthCallbackUrl = config['oAuthCallbackUrl'];
          this.configUrls = config;
          this.oAuthTokenUrl = this.authenticationServerUrl + '/oauth/authorize?redirect_uri=' + this.oAuthCallbackUrl +
            '&response_type=token&client_id=' + this.clientId + '&scope=' + this.clientScope;
          this.subject.next({config: config});
        },
        error: (err: any) => {
          console.error('config file not found : ', err);
        }
      }));
  }

  getUser(isError?: boolean) {
    if (!isDevMode() || (this.token != null)) {
      this.http.get(this.oAuthUserUrl)
        .subscribe((info: any): any => ({
          next: () => {
            this.principalInfo = info;
            this.userName = info['name'];
            this.firstName = info['principal']['firstName'];
            this.lastName = info['principal']['lastName'];
            let authorities = info['authorities'];
            let roleList: any[] = [];
            this.authenticated = true;
            if (!isError) {
              this.router.navigate([window.location['hash'].toString().substring(1, window.location['hash'].length)]);
            }
            this.subjectPrincipal.next({principalInfo: this.principalInfo});
            _.forEach(authorities, function (item: any) {
              roleList.push(item.authority);
            });
            this.roleList = roleList;
            this.router.navigate(['/home']);
          },
          error: (err: any) => {
            console.log('Failed to fe tch user info:' + err);
            this.windows.createWindow('login');
          }
        }));
    }
  }

  // last logout
  /*logout() {
    this.http.post(this.oAuthLogoutUrl, {}, {withCredentials: true}).pipe(finalize(() => {
      this.authenticated = false;
      this.token = null;
      this.expires = null;
      this.cookieService.remove('access-token');
      this.cookieService.remove('expires');
      this.cookieService.remove('JSESSIONID');
      if (!isDevMode()) {
        this.http.post('logout', {},)
          .subscribe(() => {
            window.location.reload();
          }, err => {
            window.location.reload();
          });
      }
      window.location.reload();
    })).subscribe();
  }*/


  parse(str: any) {
    if (typeof str !== 'string') {
      return {};
    }

    str = str.trim().replace(/^(\?|#|&)/, '');

    if (!str) {
      return {};
    }

    return str.split('&').reduce(function (ret: any, param: any) {
      const parts = param.replace(/\+/g, ' ').split('=');
      let key = parts.shift();
      let val = parts.length > 0 ? parts.join('=') : undefined;
      key = decodeURIComponent(key);
      val = val === undefined ? null : decodeURIComponent(val);

      if (!ret.hasOwnProperty(key)) {
        ret[key] = val;
      } else if (Array.isArray(ret[key])) {
        ret[key].push(val);
      } else {
        ret[key] = [ret[key], val];
      }

      return ret;
    }, {});
  }

  Mask_dec2bin(dec: any) {
    let binnarylist: string;
    let finallist = {};
    if (dec > -1) {
      binnarylist = (dec >>> 0).toString(2);
      if (binnarylist.length <= 9) {
        let x = binnarylist.length;
        for (let i = 1; i <= 9 - x; i++) {
          binnarylist = '0' + binnarylist;
        }
      }

      let maskModel = new MaskModel();
      maskModel.Administrator = (binnarylist[0] == '1' ? true : false);
      maskModel.read = (binnarylist[8] == '1' ? true : false);
      maskModel.edit = (binnarylist[7] == '1' ? true : false);
      maskModel.create = (binnarylist[6] == '1' ? true : false);
      maskModel.delete = (binnarylist[5] == '1' ? true : false);
      maskModel.print = (binnarylist[4] == '1' ? true : false);
      maskModel.scan = (binnarylist[3] == '1' ? true : false);
      maskModel.upload = (binnarylist[2] == '1' ? true : false);
      maskModel.download = (binnarylist[1] == '1' ? true : false);

      return maskModel;
    }
    return null;
  }

}

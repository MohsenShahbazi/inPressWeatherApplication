import { Injectable } from '@angular/core';

declare let Cookies: any;

@Injectable()
export class CookieService {

  cookies: any = Cookies; //Cookies is a global Object

  constructor() {

  }

  getCookie(cookieName: string) {
    return this.cookies.get(cookieName);
  }

  getAllCookies() {
    return this.cookies.get();
  }

  setCookie(name: string, value: string, path: string = '/', domain: string, expiresInDays: number = 0) {
    let options: any = {};
    options.path = path;
    if (domain) {
      options.domain = domain;
    }
    if (expiresInDays > 0)
      options.expires = expiresInDays;
    this.cookies.set(name, value, options);
  }

}

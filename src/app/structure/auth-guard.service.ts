import {
  ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router,
  RouterStateSnapshot
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {map, catchError} from 'rxjs/operators';
import {AuthService} from "./auth/auth.service";


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this.authService.isAuthenticated().pipe(map(e => {
      if (e) {
        return true;
      } else {
        this.router.navigate(['/401']);
        return false;
      }
    }), catchError(() => {
      this.router.navigate(['/home']);
      return of(false);
    }));
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}

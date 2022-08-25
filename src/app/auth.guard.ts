import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { user } from './store/reducers/user.reducer';
import { UserModel } from './store/store.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private store: Store<{ user: UserModel }>,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select('user').pipe(map(userData => {
      console.log(userData);
      const url = route.url[0].path;
      if (url === 'login') {
        if (userData.userId) {
          this.router.navigate(['employee']);
        } else {
          return true;
        }
      } else if (url === 'employee') {
        if (!userData.userId) {
          console.log('called');
          this.router.navigate(['login']);
        } else {
          return true;
        }
      }
      return true;
    }));
  }

}

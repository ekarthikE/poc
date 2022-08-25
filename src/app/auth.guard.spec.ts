import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { on, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerSpy = { navigate: jasmine.createSpy('') };
  let activatedRouteSpy: any = { snapshot: {}, url: [{ path: 'login' }] };
  let routeStateSpy: any = { snapshot: {}, url: '' };
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: Router, useValue: routerSpy
      }, {
        provide: Store, useValue: {
          select() {
            return of({ userId: '', password: '' })
          },
          dispatch() { }
        }
      }]
    });
    guard = TestBed.get(AuthGuard);
    store = TestBed.get(Store);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should be in login page if user is null', () => {
    let activate = guard.canActivate(activatedRouteSpy, routeStateSpy) as Observable<boolean | UrlTree>;
    const a = activate.subscribe(x => {
      expect(x).toBe(true);
    });
  });

  it('should be in employee page if user is available', () => {
    store.select = function () {
      return of({ userId: 'karthik@ibm.com', password: 'dsfjsdfkjdf' })
    };
    activatedRouteSpy = { snapshot: {}, url: [{ path: 'employee' }] };
    let activate = guard.canActivate(activatedRouteSpy, routeStateSpy) as Observable<boolean | UrlTree>;
    const a = activate.subscribe(x => {
      expect(x).toBe(true);
    });
  });

  it('should be redirected to login page from employee page if user is not available', () => {
    store.select = function () {
      return of({ userId: '', password: '' })
    };
    activatedRouteSpy = { snapshot: {}, url: [{ path: 'employee' }] };
    let activate = guard.canActivate(activatedRouteSpy, routeStateSpy) as Observable<boolean | UrlTree>;
    const a = activate.subscribe(x => {
      expect(x).toBe(true);
    });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['login']);
  });
});

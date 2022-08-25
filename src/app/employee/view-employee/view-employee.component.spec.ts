import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { HttpService } from '../http.service';
import { TitleCasePipe } from '../title-case.pipe';

import { ViewEmployeeComponent } from './view-employee.component';

describe('ViewEmployeeComponent', () => {
  let component: ViewEmployeeComponent;
  let fixture: ComponentFixture<ViewEmployeeComponent>;
  let routerSpy = { navigate: jasmine.createSpy('create') };
  let activatedRoute: ActivatedRoute;
  let dummyData = { "id": 7, "email": "michael.lawson@reqres.in", "first_name": "Michael", "last_name": "Lawson", "avatar": "https://reqres.in/img/faces/7-image.jpg" };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewEmployeeComponent, TitleCasePipe],
      providers: [{
        provide: Router, useValue: routerSpy
      }, {
        provide: ActivatedRoute, useValue: {}
      }, {
        provide: Store, useValue: {
          select() {
            return of({})
          }
        }
      }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    activatedRoute = TestBed.get(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to create', () => {
    component.create();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['create'], { relativeTo: activatedRoute });
  });

  // it('should get data from api', () => {
  //   component.ngOnInit();
  //   spyOn(httpService, 'getEmployees').and.returnValue(of([dummyData]));
  //   expect(component.employeeData.length).toBe(1);
  // });
});

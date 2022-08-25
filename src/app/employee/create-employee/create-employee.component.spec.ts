import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CreateEmployeeComponent } from './create-employee.component';

describe('CreateEmployeeComponent', () => {
  let component: CreateEmployeeComponent;
  let fixture: ComponentFixture<CreateEmployeeComponent>;
  let routerSpy = {navigate: jasmine.createSpy('employee')};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CreateEmployeeComponent
      ], imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([{
          path: 'employee', redirectTo: ''
        }])
      ], providers: [{
        provide: Router, useValue: routerSpy
      }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should download the json', () => {
    component.employees = [{ id: 1, firstName: 'Karthik', lastName: 'E' }];
    const spyObj = jasmine.createSpyObj('a', ['click', 'remove']);
    spyOn(document, 'createElement').and.returnValue(spyObj);
    component.save();
    expect(document.createElement).toHaveBeenCalledTimes(1);
    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(spyObj.href).toContain('blob:http://localhost:9876/');
    expect(spyObj.download).toBe('employees.json');
    expect(spyObj.click).toHaveBeenCalledTimes(1);
    expect(spyObj.click).toHaveBeenCalledWith();
  });

  it('should validate email pattern', () => {
    const control = new FormControl([]);
    control.setValue('karthik@ibm.com');
    const validation = component.createPasswordStrengthValidator(control);
    expect(validation).toBe(null);
    control.setValue('karthik');
    const _validation = component.createPasswordStrengthValidator(control);
    expect(_validation).not.toBe(null);
  });

  it('should navigate to employee', () => {
    component.goBack();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['employee']);
  });

  it('form should be created', () => {
    const form = component.employeeForm;
    const _form = {
      firstName: '',
      lastName: '',
      email: ''
    };
    expect(form.value).toEqual(_form);
  });

  it('should add item to array and reset form', () => {
    component.employeeForm.setValue({
      firstName: 'karthik',
      lastName: 'e',
      email: 'karthik@ibm.com'
    });
    const employeeCount = component.employees.length;
    component.addEmployee();
    expect(component.employees.length).toBe(employeeCount + 1);
    const form = component.employeeForm;
    const _form = {
      firstName: null,
      lastName: null,
      email: null
    };
    expect(form.value).toEqual(_form);
  });
});

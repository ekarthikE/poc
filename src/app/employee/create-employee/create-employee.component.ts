import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employees: any[] = [];
  employeeForm: FormGroup;

  constructor(
    private titleService: Title,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.titleService.setTitle('Create Employee');
    this.employeeForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, this.createPasswordStrengthValidator]]
    });
  }

  ngOnInit(): void {
  }

  addEmployee() {
    this.employees.push(this.employeeForm.value);
    this.employeeForm.reset();
  }

  get form() {
    return this.employeeForm.controls;
  }

  save() {
    const data = { employees: this.employees };
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'employees.json';
    link.click();
    link.remove();
  }

  createPasswordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const email_pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (control.value && control.value.match(email_pattern)) {
      return null;
    } else {
      return { error: true };
    }
  }

  goBack(): void {
    this.router.navigate(['employee']);
  }

}

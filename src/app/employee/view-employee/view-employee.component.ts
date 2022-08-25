import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../../store/store.model';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {

  employeeData: EmployeeModel[] = [];
  employees: Observable<EmployeeModel[]>;

  constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<{ employee: EmployeeModel[] }>
  ) {
    this.titleService.setTitle('View Employees');
    this.employees = store.select('employee');
  }

  ngOnInit(): void {
    this.employees.subscribe(x => {
      const empData = Object.values(x);
      this.employeeData = empData.slice(0, empData.length - 2);
    });
  }

  create(): void {
    this.router.navigate(['create'], { relativeTo: this.activatedRoute });
  }

}

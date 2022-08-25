import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {

  employeeData = [];

  constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) {
    this.titleService.setTitle('View Employees');
  }

  ngOnInit(): void {
    this.httpService.getEmployees().subscribe(data => {
      this.employeeData = data;
    });
  }

  create(): void {
    this.router.navigate(['create'], { relativeTo: this.activatedRoute });
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { SharedModule } from '../shared/shared.module';
import { EmployeeComponent } from './employee/employee.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { TitleCasePipe } from './title-case.pipe';

@NgModule({
  declarations: [
    CreateEmployeeComponent,
    ViewEmployeeComponent,
    EmployeeComponent,
    TitleCasePipe
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    NgbCarouselModule
  ]
})
export class EmployeeModule { }

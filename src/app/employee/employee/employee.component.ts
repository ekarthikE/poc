import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserModel } from '../../store/store.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  userObj: Observable<UserModel>;
  user: string = '';

  constructor(
    private store: Store<{ user: UserModel }>
  ) {
    this.userObj = store.select('user');
  }

  ngOnInit(): void {
    this.userObj.subscribe(x => {
      this.user = x.userId;
    });
  }

}

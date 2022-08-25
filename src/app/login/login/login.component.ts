import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from '../../store/actions/user.action';
import { UserModel } from '../../store/store.model';

export interface FormControls {
  [key: string]: AbstractControl;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private titleService: Title,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<{ user: UserModel }>
  ) {
    this.titleService.setTitle('Login');
    this.loginForm = this.formBuilder.group({
      userId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    });
  }

  ngOnInit(): void {
  }

  submit() {
    this.store.dispatch(login(this.loginForm.value));
    this.router.navigate(['employee']);
  }

  get form(): FormControls {
    return this.loginForm.controls as FormControls;
  }

}

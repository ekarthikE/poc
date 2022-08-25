import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getEmployees() {
    return this.http.get('https://reqres.in/api/users?page=2').pipe(map((data: any) => data['data']));
  }
}

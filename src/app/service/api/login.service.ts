import { Injectable } from '@angular/core';
import { HttpService } from '../util/http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
const API_URL = environment.API_URL
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpService) {}

  create(credential: any) {
    return this.http.get(`${API_URL}/mobile_app/login.php?username=${credential.username}&password=${credential.password}`);
  }

  getData(): any{
    return this.http.get(`${API_URL}/mobile_app/list.php`);
  }

  // Add more methods for other API endpoints as needed
}
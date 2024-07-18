import { Injectable } from '@angular/core';
import { HttpService } from '../util/http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
const API_URL = environment.API_URL
@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpService) {}

  getRequest(barcode: any, name: any, id: any) {
    return this.http.getReq(`${API_URL}/mobile_app/update.php?name=${name}&request_id=${barcode}&department_id=${id}`);
  }

  getData(): any{
    return this.http.get(`${API_URL}/mobile_app/list.php`);
  }

  // Add more methods for other API endpoints as needed
}
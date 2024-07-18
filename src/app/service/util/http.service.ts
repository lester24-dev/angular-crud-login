import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpService {
  httpHeaders: any = HttpHeaders

  constructor(
    private http: HttpClient) {
      this.httpHeaders = new HttpHeaders();
      this.httpHeaders.append( 'Access-Control-Allow-Origin', '*');
      this.httpHeaders.append( 'Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, PATCH, OPTIONS');
      this.httpHeaders.append( 'Access-Control-Allow-Headers', 'token, Content-Type');
      this.httpHeaders.append( 'Access-Control-Max-Age', '1728000');
      this.httpHeaders.append( 'Content-Length', '0');
      this.httpHeaders.append( 'Content-Type', 'application/json');
  }

  get(url: any): any {
    return this.http.get(url, {
      headers: this.httpHeaders
    })
  }

  getReq(url: any): any {
    return this.http.get(url, {
      headers: this.httpHeaders,
      responseType: 'text'
    })
  }

  post(url: any, data: any): any {
    return this.http.post(url, data, {
      headers: this.httpHeaders
    })
    }


  patch(url: any, data: any): any {
    return this.http.patch(url, data, {
      headers: this.httpHeaders
    })
  }

  delete(url: any): any {
    return this.http.delete(url, {
      headers: this.httpHeaders
    })
  }


}

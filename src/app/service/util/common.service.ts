import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { throwError } from 'rxjs';

@Injectable()
export class CommonService {

  extractData(response: any) {
    return response || { };
  }

  handleError (error: any) {
    return throwError(error)
  }

}

import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export function catchHttpError(err: HttpErrorResponse | any): Observable<any> {
  let emsg = '';

  if (!err) {
    return of(undefined);
  }

  if (err.error && err.error && err.error.message) {
    emsg = `${err.error.message}`;
  } else {
    switch (err.status) {
      case 500:
        emsg = `${err.error}`;
        break;
      case 403:
        emsg = `Insufficient permissions to view this page. \n`;
        break;
      case 401:
        emsg = `Credentials failed evaluation. \n`;
        break;
      default:
        emsg = `Error code ${err.status}. ${
          err.body ? err.body.error : err.message !== undefined ? err.message : ''
        }`;
    }
  }

  alert(emsg); // TODO: Replace with a proper message service
  return of(undefined);
}

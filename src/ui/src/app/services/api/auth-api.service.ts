import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Category, Searcher, SearcherResponse } from 'src/app/models';
import { catchHttpError } from 'src/app/shared/utils';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  url = 'api/auth/login';

  constructor(private http: HttpClient) {}

  login(): Observable<{ token: string }> {
    return this.http.post(this.url, {}).pipe(catchError((err) => catchHttpError(err)));
  }
}

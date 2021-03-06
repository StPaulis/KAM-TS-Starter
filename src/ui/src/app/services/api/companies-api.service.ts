import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Company, Searcher, SearcherResponse } from 'src/app/models';
import { catchHttpError } from 'src/app/shared/utils';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompaniesApiService {
  url = '/api/companies/';

  constructor(private http: HttpClient) {}

  getbyId(id: string): Observable<Company> {
    return this.http.get<Company>(this.url + id).pipe(catchError((err) => catchHttpError(err)));
  }

  add(model: { name: string; logoUrl: string; email?: string }): Observable<string> {
    return this.http.post<string>(this.url, model).pipe(catchError((err) => catchHttpError(err)));
  }

  edit(model: Partial<Company>): Observable<Partial<Company>> {
    return this.http
      .put<Partial<Company>>(this.url, model)
      .pipe(catchError((err) => catchHttpError(err)));
  }

  delete(id: string): Observable<Partial<Company>> {
    return this.http
      .delete<Partial<Company>>(this.url + '/' + id)
      .pipe(catchError((err) => catchHttpError(err)));
  }

  search(model: Searcher): Observable<SearcherResponse<Company>> {
    return this.http
      .post<SearcherResponse<Company>>(this.url + 'search', model)
      .pipe(catchError((err) => catchHttpError(err)));
  }

  associateCategory(model: { companyId: string; categoryId: string }): Observable<Company> {
    return this.http
      .post<Company>(this.url + 'category', model)
      .pipe(catchError((err) => catchHttpError(err)));
  }
}

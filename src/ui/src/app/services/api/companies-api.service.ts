import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Company, Searcher, SearcherResponse } from 'src/app/models';
import { catchHttpError } from 'src/app/shared/utils';

@Injectable({
  providedIn: 'root',
})
export class CompaniesApiService {
  url = '/api/companies/';

  constructor(private http: HttpClient) {}

  getbyId(id: string) {
    return this.http.get<Company>(this.url + id).pipe(catchError(err => catchHttpError(err)));
  }

  add(model: { name: string; logoUrl: string; email?: string }) {
    return this.http.post<string>(this.url, model).pipe(catchError(err => catchHttpError(err)));
  }

  edit(model: Partial<Company>) {
    return this.http
      .put<Partial<Company>>(this.url, model)
      .pipe(catchError(err => catchHttpError(err)));
  }

  search(model: Searcher) {
    return this.http
      .post<SearcherResponse<Company>>(this.url, model)
      .pipe(catchError(err => catchHttpError(err)));
  }

  associateCategory(model: { companyId: string; categoryId: string }) {
    return this.http
      .post<Company>(this.url + 'category', model)
      .pipe(catchError(err => catchHttpError(err)));
  }
}

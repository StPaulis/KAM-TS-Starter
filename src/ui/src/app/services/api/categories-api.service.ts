import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Category, Searcher, SearcherResponse } from 'src/app/models';
import { catchHttpError } from 'src/app/shared/utils';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesApiService {
  url = 'api/categories/';

  constructor(private http: HttpClient) {}

  add(model: { name: string }): Observable<string> {
    return this.http.post<string>(this.url, model).pipe(catchError(err => catchHttpError(err)));
  }

  edit(model: Category): Observable<Category> {
    return this.http.put<Category>(this.url, model).pipe(catchError(err => catchHttpError(err)));
  }

  search(model: Searcher): Observable<SearcherResponse<Category>> {
    return this.http
      .post<SearcherResponse<Category>>(this.url + 'search', model)
      .pipe(catchError(err => catchHttpError(err)));
  }
}

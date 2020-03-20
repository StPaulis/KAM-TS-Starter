import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Category, Searcher, SearcherResponse } from 'src/app/models';
import { catchHttpError } from 'src/app/shared/utils';

@Injectable({
  providedIn: 'root',
})
export class CategoriesApiService {
  url = '/api/categories';

  constructor(private http: HttpClient) {}

  add(model: { name: string }) {
    return this.http.post<string>(this.url, model).pipe(catchError(err => catchHttpError(err)));
  }

  edit(model: Category) {
    return this.http.post<Category>(this.url, model).pipe(catchError(err => catchHttpError(err)));
  }

  search(model: Searcher) {
    return this.http
      .post<SearcherResponse<Category>>(this.url, model)
      .pipe(catchError(err => catchHttpError(err)));
  }
}

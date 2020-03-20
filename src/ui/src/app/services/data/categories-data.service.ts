import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from 'src/app/models';
import { CategoriesApiService } from '../api/categories-api.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesDataService {
  categoriesSubject = new BehaviorSubject<Category[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  constructor(private apiSrv: CategoriesApiService) {
    // If Authorization was present we should call this after we ensure that we are logged in
    this.apiSrv.search({ filters: [], order: [{name: 'name', value: 'asc'}] }).subscribe(x => {
      if (x && x.data) {
        this.categoriesSubject.next(x.data);
      }
    });
    // If Authorization was present we should call this after we ensure that we are logged in
  }
}

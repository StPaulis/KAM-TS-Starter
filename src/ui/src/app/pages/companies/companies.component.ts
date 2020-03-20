import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category, SearchOrder, SearchFilter, Company } from 'src/app/models';
import { CategoriesDataService } from 'src/app/services/data/categories-data.service';
import { CompaniesApiService } from 'src/app/services/api/companies-api.service';

@Component({
  selector: 'cmd-companies',
  templateUrl: './companies.component.html',
  styles: [],
})
export class CompaniesComponent implements OnInit, OnDestroy {
  companies: Company[];
  categories: Category[];
  selectedCategory: Category = null;
  page = {
    first: 0,
    total: 0,
    size: 10,
  };
  defaultOrdering: SearchOrder = { name: 'name', value: 'asc' };
  onDestroy = new Subject();

  constructor(
    public categoriesDataSrv: CategoriesDataService,
    private apiSrv: CompaniesApiService
  ) {}

  ngOnInit() {
    this.categoriesDataSrv.categories$.pipe(takeUntil(this.onDestroy)).subscribe(x => {
      this.categories = x;
    });
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }

  onSelectedCategoryChanged() {
    this.loadData({ first: 0 });
  }

  loadData(event: { first: number }) {
    this.page.first = event.first;
    this.apiSrv
      .search({
        start: this.page.first,
        length: this.page.size,
        filters: this.getFilters(),
        order: [],
      })
      .subscribe(x => {
        if (!x) {
          return;
        }

        (this.companies = x.data), (this.page.total = x.filtered);
      });
  }

  getFilters(): SearchFilter[] {
    const categoryFilter = this.selectedCategory
      ? {
          name: 'categories',
          value: this.selectedCategory.id,
        }
      : undefined;

    return [categoryFilter].filter(x => !!x);
  }
}

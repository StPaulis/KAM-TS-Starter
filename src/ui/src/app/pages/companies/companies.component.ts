import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category, SearchOrder, SearchFilter, Company } from 'src/app/models';
import { CategoriesDataService } from 'src/app/services/data/categories-data.service';
import { CompaniesApiService } from 'src/app/services/api/companies-api.service';
import { CategoriesApiService } from 'src/app/services/api/categories-api.service';

@Component({
  selector: 'cmd-companies',
  templateUrl: './companies.component.html',
  styles: [],
})
export class CompaniesComponent implements OnInit, OnDestroy {
  companies: Company[];
  companyModel: Company;
  categories: Category[];
  categoryModel: Category;
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
    private categoriesApiSrv: CategoriesApiService,
    private companiesApiSrv: CompaniesApiService
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

  onAddCompanyClicked() {
    this.companyModel = {} as Company;
  }

  onAddCompanySubmited(model: Company) {
    this.companiesApiSrv
      .add({
        name: model.name,
        logoUrl: model.logoUrl,
        email: model.email,
      })
      .subscribe(x => {
        if (x) {
          this.loadData({ first: this.page.first });
          this.companyModel = null;
        }
      });
  }

  onEditCompanyClicked(model: Company) {
    this.companyModel = model;
  }

  onEditCompanySubmited(model: Company) {
    this.companiesApiSrv
      .edit({
        id: model.id,
        name: model.name,
        logoUrl: model.logoUrl,
        email: model.email,
      })
      .subscribe(x => {
        if (x) {
          this.companies = this.companies.map(company =>
            company.id === x.id ? { ...company, ...x } : company
          );
          this.companyModel = null;
        }
      });
  }

  onAddCategoryClicked() {
    this.categoryModel = {} as Category;
  }

  onAddCategorySubmited(model: Category) {
    this.categoriesApiSrv
      .add({
        name: model.name,
      })
      .subscribe(x => {
        if (x) {
          const newCategories = [...this.categories, { id: x, name: model.name }].sort((a, b) =>
            a.name > b.name ? 1 : -1
          );
          this.categoriesDataSrv.categoriesSubject.next(newCategories);
          this.categoryModel = null;
        }
      });
  }

  onEditCategoryClicked(model: Category) {
    this.categoryModel = model;
  }

  onEditCategorySubmited(model: Category) {
    this.categoriesApiSrv
      .edit({
        id: model.id,
        name: model.name,
      })
      .subscribe(x => {
        if (x) {
          const newCategories = this.categories
            .map(cat => {
              return cat.id === x.id ? x : cat;
            })
            .sort((a, b) => (a.name > b.name ? 1 : -1));
          this.categoriesDataSrv.categoriesSubject.next(newCategories);
          this.categoryModel = null;
        }
      });
  }

  private loadData(event: { first: number }) {
    this.page.first = event.first;
    this.companiesApiSrv
      .search({
        start: this.page.first,
        length: this.page.size,
        filters: this.getFilters(),
        order: [this.defaultOrdering],
      })
      .subscribe(x => {
        if (!x) {
          return;
        }

        (this.companies = x.data), (this.page.total = x.filtered);
      });
  }

  private getFilters(): SearchFilter[] {
    const categoryFilter = this.selectedCategory
      ? {
          name: 'categories',
          value: this.selectedCategory.id,
        }
      : undefined;

    return [categoryFilter].filter(x => !!x);
  }
}

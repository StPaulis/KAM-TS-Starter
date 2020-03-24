import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category, Company, SearchFilter, SearchOrder } from 'src/app/models';
import { CategoriesApiService } from 'src/app/services/api/categories-api.service';
import { CompaniesApiService } from 'src/app/services/api/companies-api.service';
import { CategoriesDataService } from 'src/app/services/data/categories-data.service';

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
    size: 9,
  };
  defaultOrdering: SearchOrder = { name: 'name', value: 'asc' };
  onDestroy = new Subject();

  constructor(
    public categoriesDataSrv: CategoriesDataService,
    private categoriesApiSrv: CategoriesApiService,
    private companiesApiSrv: CompaniesApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.categoriesDataSrv.categories$.pipe(takeUntil(this.onDestroy)).subscribe(x => {
      this.categories = x;
    });

    this.route.params.pipe(takeUntil(this.onDestroy)).subscribe(x => {
      if (!x || !x.id || !!this.companyModel) {
        return;
      }

      if (this.companies && this.companies.some(c => c.id === x.id)) {
        this.companyModel = { ...this.companies.find(c => c.id === x.id) };
        return;
      }

      this.companiesApiSrv.getbyId(x.id).subscribe(res => {
        this.companyModel = res || null;
      });
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
    this.router.navigate(['companies/' + model.id]);
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
    this.categoryModel = { ...model };
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

  onAssociateCategoryClicked(model: { companyId: string; categoryId: string }) {
    this.companiesApiSrv.associateCategory(model).subscribe(res => {
      if (!res) {
        return;
      }

      this.companyModel = { ...this.companyModel, categories: res.categories };
      this.companies = this.companies.map(x => (res.id === x.id ? res : x));
    });
  }

  clearCompanyModel() {
    this.companyModel = null;
    this.router.navigate(['companies']);
  }

  loadData(event: { first: number }) {
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

        this.companies = x.data;
        this.page.total = x.total;
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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from 'src/app/models';
import { CategoriesDataService } from 'src/app/services/data/categories-data.service';

@Component({
  selector: 'cmd-companies',
  templateUrl: './companies.component.html',
  styles: [],
})
export class CompaniesComponent implements OnInit, OnDestroy {
  categories: Category[];
  selectedCategory: Category = null;
  onDestroy = new Subject();

  constructor(public categoriesDataSrv: CategoriesDataService) {}

  ngOnInit() {
    this.categoriesDataSrv.categories$.pipe(takeUntil(this.onDestroy)).subscribe(x => {
      this.categories = x;
    });
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }

  onSelectedCategoryChanged() {
    console.log(this.selectedCategory);
  }
}

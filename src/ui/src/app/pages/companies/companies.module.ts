import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryWriteComponent } from './category-write/category-write.component';
import { CompaniesListComponent } from './companies-list/companies-list.component';
import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesComponent } from './companies.component';
import { CompanyWriteComponent } from './company-write/company-write.component';

@NgModule({
  declarations: [
    CompaniesComponent,
    CategoriesListComponent,
    CompaniesListComponent,
    CategoryWriteComponent,
    CompanyWriteComponent,
  ],
  imports: [CommonModule, CompaniesRoutingModule, SharedModule],
})
export class CompaniesModule {}

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { Category, Company } from 'src/app/models';
import { CompaniesApiService } from 'src/app/services/api/companies-api.service';
import { style } from '@angular/animations';

@Component({
  selector: 'cmd-associate-category',
  templateUrl: './associate-category.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
  .a-listbox {
    min-height: 250px;
  }
  `],
})
export class AssociateCategoryComponent implements OnChanges {
  @Input() categories: Category[];
  @Input() company: Company;
  @Output() associate = new EventEmitter<{ companyId: string; categoryId: string }>();

  data: Category[] = [];
  nonAssociatedCategories: Category[] = [];
  forRemove: Category;
  forAdd: Category;

  constructor(private cdr: ChangeDetectorRef, private apiSrv: CompaniesApiService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.company && this.company) {
      this.forRemove = null;
      this.forAdd = null;
      this.data = this.categories.filter(
        x => !!this.company.categories && this.company.categories.some(c => c === x.id)
      );
      this.nonAssociatedCategories = this.categories.filter(
        x => !!this.company.categories && this.company.categories.every(c => c !== x.id)
      );
      this.cdr.detectChanges();
    }
  }
}

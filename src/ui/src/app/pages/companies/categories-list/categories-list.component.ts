import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Category } from 'src/app/models';

@Component({
  selector: 'cmd-categories-list',
  templateUrl: './categories-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesListComponent {
  @Input() data: Category[] = [];
  @Input() selected: Category = null;
  @Output() selectedChange = new EventEmitter<Category>();

  onSelectedChange(category: Category) {
    this.selectedChange.emit(category);
  }
}

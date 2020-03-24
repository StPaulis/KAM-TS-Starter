import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from 'src/app/models';

@Component({
  selector: 'cmd-category-write',
  templateUrl: './category-write.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryWriteComponent {
  @Input() model?: Category;
  @Output() saveClicked = new EventEmitter<Category>();

  onSubmit() {
    this.saveClicked.emit(this.model);
  }
}

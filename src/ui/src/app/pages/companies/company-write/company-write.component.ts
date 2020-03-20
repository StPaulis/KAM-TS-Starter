import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Company } from 'src/app/models';

@Component({
  selector: 'cmd-company-write',
  templateUrl: './company-write.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyWriteComponent {
  @Input() model?: Company;
  @Output() saveClicked = new EventEmitter<Company>();

  onSubmit() {
    this.saveClicked.emit(this.model);
  }
}

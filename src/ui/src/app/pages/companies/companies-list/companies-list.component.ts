import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { Company } from 'src/app/models';

@Component({
  selector: 'cmd-companies-list',
  templateUrl: './companies-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompaniesListComponent {
  @Input() data: Company[];
  @Input() total = 0;
  @Input() first = 0;
  @Input() size = 9;
  @Output() loaded = new EventEmitter<{ first: number }>();
  @Output() addClicked = new EventEmitter<void>();
  @Output() deleteClicked = new EventEmitter<string>();
  @Output() editClicked = new EventEmitter<Company>();
}

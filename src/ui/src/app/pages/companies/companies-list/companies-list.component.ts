import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Company } from 'src/app/models';

@Component({
  selector: 'cmd-companies-list',
  templateUrl: './companies-list.component.html',
  styles: [],
})
export class CompaniesListComponent implements OnInit {
  @Input() data: Company[];
  @Input() total = 0;
  @Input() first = 0;
  @Output() loaded = new EventEmitter<{ first: number }>();

  constructor() {}

  ngOnInit(): void {}

  loadData(event: { first: number }) {
    this.loaded.emit(event);
  }

  onExploreClicked(item: Company) {
    console.log('Edit Clicked', item);
  }
}

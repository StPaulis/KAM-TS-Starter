import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';

const PrimengModules = [
  DataViewModule,
  DialogModule,
  DropdownModule,
  InputTextModule,
  ListboxModule,
  PanelModule,
  TabViewModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ...PrimengModules],
  exports: [FormsModule, ...PrimengModules],
})
export class SharedModule {}

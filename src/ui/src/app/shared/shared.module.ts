import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { ListboxModule } from 'primeng/listbox';
import { PanelModule } from 'primeng/panel';

const PrimengModules = [DataViewModule, ListboxModule, PanelModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ...PrimengModules],
  exports: [FormsModule, ...PrimengModules],
})
export class SharedModule {}

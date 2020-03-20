import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';

const PrimengModules = [ListboxModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ...PrimengModules],
  exports: [FormsModule, ...PrimengModules],
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalItemComponent } from './modal-item.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    ModalItemComponent
  ],
  exports: [
    ModalItemComponent
  ]
})
export class ModalItemModule { }

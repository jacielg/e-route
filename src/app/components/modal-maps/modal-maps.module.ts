import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalMapsComponent } from './modal-maps.component';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AgmCoreModule
  ],
  declarations: [
    ModalMapsComponent
  ],
  exports: [
    ModalMapsComponent
  ]
})
export class ModalMapsModule { }

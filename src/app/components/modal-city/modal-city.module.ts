import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalCityComponent } from './modal-city.component';
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
    ModalCityComponent
  ],
  exports: [
    ModalCityComponent
  ]
})
export class ModalCityModule { }

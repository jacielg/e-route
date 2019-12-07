import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminRoutes } from './admin.routing';
import { ItemComponent } from '../item/item.component';
import { AdminSidebarModule } from '../../shared/admin-sidebar/sidebar.module';
import { ModalItemModule } from '../modal-item/modal-item.module';
import { ModalMapsModule } from '../modal-maps/modal-maps.module';
import { AdminHomeComponent } from '../admin-home/admin-home.component';
import { RegisterComponent } from '../register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalCityModule } from '../modal-city/modal-city.module';
import { SedesComponent } from '../sedes/sedes.component';

@NgModule({
  declarations: [
    ItemComponent,
    AdminHomeComponent,
    RegisterComponent,
    SedesComponent
  ],
  imports: [
    CommonModule,
    AdminSidebarModule,
    ModalItemModule,
    ModalMapsModule,
    ModalCityModule,
    RouterModule.forChild(AdminRoutes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }

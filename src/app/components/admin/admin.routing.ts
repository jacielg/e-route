import { Routes } from '@angular/router';

import { ItemComponent } from '../item/item.component';
import { AdminHomeComponent } from '../admin-home/admin-home.component';
import { RegisterComponent } from '../register/register.component';
import { SedesComponent } from '../sedes/sedes.component';

export const AdminRoutes: Routes = [
  { path: 'packages', component: ItemComponent },
  { path: 'admin-home', component: AdminHomeComponent },
  { path: 'admin-create', component: RegisterComponent },
  { path: 'admin-office', component: SedesComponent }
];

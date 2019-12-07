import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { SearchComponent } from './components/search/search.component';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { OurServicesComponent } from './components/our-services/our-services.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'our-services', component: OurServicesComponent },
  { path: 'search', component: SearchComponent },
  { path: 'contact', component: ContactComponent },
  { path: '',
    component: AdminComponent,
      canActivate: [AuthGuard],
    children: [{
      path: '',
      loadChildren: './components/admin/admin.module#AdminModule'
    }]
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

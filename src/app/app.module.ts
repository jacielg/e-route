import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirestore} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { AdminComponent } from './components/admin/admin.component';
import { AboutComponent } from './components/about/about.component';
import { OurServicesComponent } from './components/our-services/our-services.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { environment } from '../environments/environment';
import { ModalItemComponent } from './components/modal-item/modal-item.component';
import { ItemComponent } from './components/item/item.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminNavbarComponent } from './shared/admin-navbar/admin-navbar.component';
import { ModalMapsComponent } from './components/modal-maps/modal-maps.component';
import { AgmCoreModule } from '@agm/core';
import { AdminSidebarComponent } from './shared/admin-sidebar/admin-sidebar.component';
import { AdminModule } from './components/admin/admin.module';
import { AdminSidebarModule } from './shared/admin-sidebar/sidebar.module';
import { ModalItemModule } from './components/modal-item/modal-item.module';
import { ModalMapsModule } from './components/modal-maps/modal-maps.module';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    SearchComponent,
    AboutComponent,
    OurServicesComponent,
    ContactComponent,
    LoginComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AdminSidebarModule,
    ModalItemModule,
    ModalMapsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBh8Qv8yDdh-SmhUG5N5qA1ioVb7zIRkVM'
    })
  ],
  providers: [AngularFirestore, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }

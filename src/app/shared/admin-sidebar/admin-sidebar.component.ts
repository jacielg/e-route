import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

  constructor(public afsAuth: AngularFireAuth, private authService: AuthService) { }
  public isLogged = false;

  ngOnInit() {
    this.getCurrentUser();
  }
  onLogout() {
    this.authService.logoutUser();
  }

  getCurrentUser() {
    this.afsAuth.authState.subscribe(auth => {
      if (auth) {
        console.log('user is logged');
        this.isLogged = true;
      } else {
        console.log('User is not logged');
        this.isLogged = false;
      }
    });
  }
}

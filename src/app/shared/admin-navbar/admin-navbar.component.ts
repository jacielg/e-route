import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

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

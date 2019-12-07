import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;
  loginForm: FormGroup;
  submitted = false;
  errorMessage: string;

  constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.loginForm.controls; }

  onLoginEmail() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.loginEmailUser(this.email, this.password)
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => this.errorMessage = 'Email o contraseña incorrectos.');
  }

  onLoginRedirect(): void {
    this.router.navigate(['/admin-home']);
  }
}

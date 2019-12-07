import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public email: string;
  public password: string;
  submitted = false;
  successMessage: string;
  regForm: FormGroup;

  constructor(private router: Router, private authServer: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.regForm.controls; }

  onUserRegistry() {
    this.submitted = true;

    if (this.regForm.invalid) {
      return;
    }
    this.authServer.registerUser(this.email, this.password)
      .then((res) => {
        this.successMessage = 'Se ha creado el usuario exitosamente.';
      }).catch(err => console.log('err', err.message));
  }

  onExit(): void {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

}

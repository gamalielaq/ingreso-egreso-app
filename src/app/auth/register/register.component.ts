import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  appForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.buildForm();
  }


  buildForm() {
    this.appForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }


  createUser() {
    if (this.appForm.valid) {
      const { nombre, correo, password } = this.appForm.value;
      this._authService.createUser(nombre, correo, password)
        .then(credenciales => {
          console.log(credenciales);
          this.router.navigate(['/']);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}

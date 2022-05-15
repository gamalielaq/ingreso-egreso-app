import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import Swal from 'sweetalert2';

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


      Swal.fire({
        title: 'Espere por favor!',
        didOpen: () => {
          Swal.showLoading();
        }
      })

      const { nombre, correo, password } = this.appForm.value;
      this._authService.createUser(nombre, correo, password)
        .then( () => {
          Swal.close();
          this.router.navigate(['/']);
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message + '!',
          })
        });
    }
  }
}

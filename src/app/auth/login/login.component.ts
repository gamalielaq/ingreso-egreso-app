import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  appForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }


  buildForm() {
    this.appForm = this.fb.group({
      email: ['gamaliel.aq96@gmail.com', [Validators.required, Validators.email]],
      pssword: ['123456', Validators.required]
    })
  }

  login() {
    if (this.appForm.valid) {
      Swal.fire({
        title: 'Espere por favor!',
        didOpen: () => {
          Swal.showLoading();
        }
      })

      const { email, pssword } = this.appForm.value;
      this.authService.login(email, pssword)
        .then(response => {
          Swal.close();
          this.router.navigate(['/']);
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message + '!',
          })
        })
    }
  }

}

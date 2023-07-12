import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    })

  }
  loginRequest() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe((suc) => {
        if (suc) {
          Swal.fire('Login Success', 'Welcome Back' + ' ' + this.loginForm.value.username, 'success');
          this.loginForm.reset();
          localStorage.setItem('accessToken', suc.accessToken);
          localStorage.setItem('isLoggedIn',JSON.stringify(true));
          this.router.navigate(['/dashboard']);
        } else {
          Swal.fire('Oops', "suc.message", 'error');
        }
      },
        (err) => {
          if (err.status == 401) {
            Swal.fire('Oops', "Invalid username/Password", 'error');
          } else {
            Swal.fire('Oops', 'Something went wrong', 'error');
          }
        }
      );

    }
  }

}

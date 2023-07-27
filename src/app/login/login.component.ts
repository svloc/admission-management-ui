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
  public signupForm: FormGroup;
  public isLogin: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadLoginForm();
    this.loadSignupForm();
  }

  loadLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  loadSignupForm(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      associateName: ['', Validators.compose([Validators.required])],
      associateAddress: ['', Validators.compose([Validators.required])],
      associateEmailId: ['', Validators.compose([Validators.required])],
    });
  }


  toggleStatus(): void {
    this.isLogin = !this.isLogin;
    this.loginForm.reset();
  }

  loginRequest() {
    if (this.loginForm.valid && this.isLogin) {
      this.authService.login(this.loginForm.value).subscribe((suc) => {
        if (suc) {
          Swal.fire('Login Success', 'Welcome Back' + ' ' + this.loginForm.value.username, 'success');
          this.loginForm.reset();
          localStorage.setItem('accessToken', suc.accessToken);
          localStorage.setItem('isLoggedIn', JSON.stringify(true));
          localStorage.setItem('roles', suc.roles);
          localStorage.setItem('associateId', suc.associateId);
          this.router.navigate(['/dashboard/associate']);
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
  signupRequest() {
    if (this.signupForm.valid && !this.isLogin) {
      this.authService.addUser(this.signupForm.value).subscribe((suc) => {
        Swal.fire('User added successfully', 'success');
        this.toggleStatus();
      },
        (err) => {
          Swal.fire('Oops', 'Something went wrong', 'error');
        }
      );
    }
  }
}

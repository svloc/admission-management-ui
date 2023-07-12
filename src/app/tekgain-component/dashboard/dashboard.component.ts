import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private router: Router ) { }
  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isLoggedIn');
    Swal.fire('Logout Success', 'success');
    this.router.navigate(['/']);
  }
}

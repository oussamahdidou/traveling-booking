import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [AuthService],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  password: string = '';
  email: string = '';
  username: string = '';
  constructor(private authService: AuthService) { }
  onsubmit() {
    this.authService.registeradmin(this.username, this.email, this.password).subscribe(
      response => {
        console.log('Successfully registered admin');
        window.location.href = '/auth/createplace';
      },
      error => {
        console.log(error.error)
      }
    );
  }
}


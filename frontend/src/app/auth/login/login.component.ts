import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService: AuthService) { }
  username: string = '';
  password: string = '';
  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        console.log(response)
        window.location.href = '/';

      },
      (error) => {
        console.log(error)

      }
    )
  }
}


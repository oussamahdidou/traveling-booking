import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, NavigationStart, Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { SearchService } from './services/search.service';
import { TruncatePipe } from './pipes/truncate.pipe';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  providers: [AuthService, SearchService],
  imports: [RouterModule, RouterOutlet, CommonModule, FormsModule, HttpClientModule, TruncatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
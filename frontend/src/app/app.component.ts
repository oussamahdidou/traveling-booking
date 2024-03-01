import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { SearchService } from './services/search.service';
@Component({
  selector: 'app-root',
  standalone: true,
  providers: [AuthService, SearchService],
  imports: [RouterOutlet, CommonModule, FormsModule, SlickCarouselModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  showNavbar: boolean = true;
  villes: any[] = [];
  entreprises: any[] = [];
  constructor(private router: Router, public authservice: AuthService, private searchservice: SearchService) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !['/auth/login', '/auth/register', '/search/map'].includes(this.router.url);
      }
    });
  }
  logout() {
    this.authservice.logout();
  }
  _search() {
    if (this.search.length >= 3) {
      this.searchservice.search(this.search).subscribe(
        (data) => {
          console.log("data", data);
          this.entreprises = data.entreprises
          this.villes = data.villes
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }
  title = 'travelnest';
  search: string = '';

}

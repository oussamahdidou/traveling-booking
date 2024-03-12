import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, NavigationStart, Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { SearchService } from './services/search.service';
import { TruncatePipe } from './pipes/truncate.pipe';
@Component({
  selector: 'app-root',
  standalone: true,
  providers: [AuthService, SearchService],
  imports: [RouterModule, RouterOutlet, CommonModule, FormsModule, HttpClientModule, TruncatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  showNavbar: boolean = true;
  villes: any[] = [];
  entreprises: any[] = [];
  sidenave: boolean = false;
  constructor(private router: Router, public authservice: AuthService, private searchservice: SearchService) { }
  adminplaceid: number = 0;
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Increment the route change count
        this.search = '';
        this.sidenave = false;
        // You can put any logic here you want to execute upon route change
      }
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !['/auth/login', '/auth/register', '/auth/user', '/auth/admin', '/auth/createplace', '/search/map'].includes(this.router.url);
      }
    });
    this.authservice.$IsAdmin.subscribe(response => {
      if (response == true) {
        this.searchservice.getAdminplace().subscribe(response => { this.adminplaceid = response; })
      }
    })


  }
  logout() {
    this.authservice.logout();
  }
  _search() {
    if (this.search.length >= 3) {
      this.searchservice.search(this.search).subscribe(
        (data) => {
          this.entreprises = data.entreprises
          this.villes = data.villes
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }
  showsearch: boolean = false;
  _showsearch() {
    this.showsearch = !this.showsearch;
  }
  showsidenav() {
    this.sidenave = !this.sidenave;
  }
  onSearch() {
    this.router.navigate([`search/query/${this.search}`]);
  }
  title = 'travelnest';
  search: string = '';

}

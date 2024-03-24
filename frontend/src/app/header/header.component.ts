import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SearchService } from '../services/search.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TruncatePipe } from '../pipes/truncate.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  providers: [AuthService, SearchService],
  imports: [RouterModule, RouterOutlet, CommonModule, FormsModule, HttpClientModule, TruncatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  showNavbar: boolean = true;
  villes: any[] = [];
  entreprises: any[] = [];
  sidenave: boolean = false;
  constructor(private router: Router, public authservice: AuthService, private searchservice: SearchService) {

  }
  adminplaceid: number = 0;
  ngOnInit() {

    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationStart) {
    //     window.scrollTo(0, 0);
    //     this.search = '';
    //     this.sidenave = false;
    //     // You can put any logic here you want to execute upon route change
    //   }
    // });

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
    this.search = '';
    this.showsearch = !this.showsearch;

  }
  showsidenav() {
    this.sidenave = !this.sidenave;
    this.search = '';
  }
  onSearch() {
    this.router.navigate([`search/query/${this.search}`]);
  }
  //title = 'travelnest';
  search: string = '';

}
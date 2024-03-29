import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { VerticalplaceholderComponent } from '../placeholders/verticalplaceholder/verticalplaceholder.component';

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [SearchService],
  imports: [CommonModule, HttpClientModule, VerticalplaceholderComponent, FooterComponent, RouterModule, FormsModule, TruncatePipe, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  isLoading: boolean = false;
  countries: any[] = [];
  cities: any[] = [];
  city: number = 0;
  top: any[] = [];
  hotels: any[] = [];
  restaurants: any[] = []
  activities: any[] = []
  constructor(private searchservice: SearchService, private router: Router) {


  }
  ngOnInit(): void {
    this.searchservice.TopFiveeatchtype().subscribe(reposnse => {
      this.hotels = reposnse.hotels;
      this.restaurants = reposnse.restaurant;
      this.activities = reposnse.activities;

      this.isLoading = true;
    })
    this.searchservice.GetCountries().subscribe(
      response => {
        this.countries = response;
      },
      error => { console.log(error) }
    )
    this.searchservice.TopPlaces().subscribe(
      response => { this.top = response; },
      error => { console.log(error) }
    )
  }
  getcity($event: any) {
    this.searchservice.GetCities($event.target.value).subscribe(response => {
      this.cities = response;
    },
      error => {
        console.log(error);
      });

  }
  movetonext(event: Event) {
    event.stopPropagation();
    if (this.selectedIndex === this.top.length - 1) {
      this.selectedIndex = 0;
    }
    else {
      this.selectedIndex++;
    }

  }
  movetoback(event: Event) {
    event.stopPropagation();
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.top.length - 1;
    }
    else {
      this.selectedIndex--;
    }

  }
  gotoplace(id: number) {
    this.router.navigate(['/place/' + id])
  }
  selectedIndex: number = 0;
  calculateAverageRate(place: any): number {
    if (0 == place.ratings.length) {
      return 0;
    }
    const totalRate = place.ratings.reduce((acc, item) => acc + item.rate, 0);
    return totalRate / place.ratings.length;
  }

}

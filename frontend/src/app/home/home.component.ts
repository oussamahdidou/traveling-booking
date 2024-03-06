import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TruncatePipe } from '../pipes/truncate.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [SearchService],
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule, TruncatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  countries: any[] = [];
  cities: any[] = [];
  city: number = 0;
  top: any[] = [];
  hotels: any[] = [];
  restaurants: any[] = []
  activities: any[] = []
  constructor(private searchservice: SearchService) {


  }
  ngOnInit(): void {
    this.searchservice.TopFiveeatchtype().subscribe(reposnse => {
      this.hotels = reposnse.hotels;
      this.restaurants = reposnse.restaurant;
      this.activities = reposnse.activities;


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
  movetonext() {
    if (this.selectedIndex === this.top.length - 1) {
      this.selectedIndex = 0;
    }
    else {
      this.selectedIndex++;
    }

  }
  movetoback() {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.top.length - 1;
    }
    else {
      this.selectedIndex--;
    }

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

import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SearchService } from '../services/search.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [SearchService],
  imports: [SlickCarouselModule, CommonModule, HttpClientModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  countries: any[] = [];
  cities: any[] = [];
  city: number = 0;
  top: any[] = [];
  constructor(private searchservice: SearchService) {


  }
  ngOnInit(): void {

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


}

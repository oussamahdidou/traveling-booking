import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { HttpClientModule } from '@angular/common/http';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-city',
  standalone: true,
  providers: [SearchService],
  imports: [CommonModule, HttpClientModule, RouterModule, TruncatePipe],
  templateUrl: './city.component.html',
  styleUrl: './city.component.css'
})
export class CityComponent implements OnInit {
  places: any[] = [];
  top: any[] = [];
  constructor(private route: ActivatedRoute, private searchService: SearchService) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const itemId = params['id'];
      this.searchService.PlacesByCity(itemId).subscribe(
        response => {
          this.places = response;
        },
        error => {
          console.log(error)
        });
      this.searchService.TopPlacesByCity(itemId).subscribe(response => {
        this.top = response;
      })

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

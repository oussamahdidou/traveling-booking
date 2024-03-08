import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, TruncatePipe],
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent implements OnInit {
  places: any[] = [];
  top: any[] = [];
  constructor(private route: ActivatedRoute, private searchService: SearchService, private router: Router) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const lat = params['lat'];
      const lng = params['lng'];
      this.searchService.PlacesBylocation(lat, lng).subscribe(response => { this.places = response; });
      this.searchService.TopPlacesByLocation(lat, lng).subscribe(response => { this.top = response; });



    })
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

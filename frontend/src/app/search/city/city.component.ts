import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { HttpClientModule } from '@angular/common/http';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { HorisontalplaceholderComponent } from '../../placeholders/horisontalplaceholder/horisontalplaceholder.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-city',
  standalone: true,
  providers: [SearchService],
  imports: [InfiniteScrollModule, CommonModule, HttpClientModule, HorisontalplaceholderComponent, RouterModule, TruncatePipe, HeaderComponent, FooterComponent],
  templateUrl: './city.component.html',
  styleUrl: './city.component.css'
})
export class CityComponent implements OnInit {

  places: any[] = [];
  isLoading: boolean = true;
  isLoadingTop: boolean = true;
  top: any[] = [];
  constructor(private route: ActivatedRoute, private searchService: SearchService, private router: Router) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const itemId = params['id'];
      this.searchService.PlacesByCity(itemId).subscribe(
        response => {
          this.places = response;
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
          console.log(error)
        });
      this.searchService.TopPlacesByCity(itemId).subscribe(response => {
        console.log(response);
        console.log(itemId);
        this.top = response;
        this.isLoadingTop = false;
      })

    });
  }
  onScroll() {
    console.log("your in the end");
    this.isLoading = false;
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

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-query',
  standalone: true,
  providers: [SearchService],
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './query.component.html',
  styleUrl: './query.component.css'
})
export class QueryComponent implements OnInit {
  places: any[] = [];
  query!: string;
  top: any[] = [];
  constructor(private route: ActivatedRoute, private searchService: SearchService) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.query = params['query'];
      this.searchService.PlacesByQuery(this.query).subscribe(
        response => {
          this.places = response;
          console.log(this.places);
        },
        error => {
          console.log(error)
        });
      this.searchService.TopPlacesByQuery(this.query).subscribe(response => { this.top = response })
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

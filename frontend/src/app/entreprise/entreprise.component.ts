import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SearchService } from '../services/search.service';
import { SocialService } from '../services/social.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entreprise',
  standalone: true,
  providers: [AuthService, SearchService, SocialService],
  imports: [HttpClientModule, RouterModule, FormsModule, CommonModule],
  templateUrl: './entreprise.component.html',
  styleUrl: './entreprise.component.css'
})
export class EntrepriseComponent implements OnInit {
  place: any;
  itemId: number = 0;
  comment: string = '';
  isLoggedIn: boolean = false;
  rating: number = 0;
  comments: any[] = [];
  constructor(private authservice: AuthService, private route: ActivatedRoute, private searchservice: SearchService, private socialservice: SocialService) { }
  ngOnInit(): void {
    this.authservice.$isloggedin.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.route.params.subscribe(params => {
        this.itemId = params['id'];
        this.searchservice.PlaceById(this.itemId).subscribe(
          response => {
            this.place = response;
            console.log(this.place.ratings)
          },
          error => {
            console.log(error)
          });
      });
      if (this.isLoggedIn) {
        this.socialservice.getuserrate(this.itemId).subscribe(
          response => {
            this.rating = response.rate
          },
          error => {
            console.log(error);
          });
      }
      this.socialservice.getcomments(this.itemId).subscribe(
        response => {
          this.comments = response
        },
        error => {
          console.log(error)
        });
    });

  }
  calculateAverageRate(): number {
    const totalRate = this.place.ratings.reduce((acc, item) => acc + item.rate, 0);
    return totalRate / this.place.ratings.length;
  }
  rate($event: any) {
    if (this.isLoggedIn) {
      this.socialservice.rate($event.target.value, this.itemId).subscribe(
        response => {
          this.rating = $event.target.value;
        },
        error => {
          console.log(error)
        }
      );
    }


  }
  addcomment() {
    if (this.isLoggedIn && this.comment.length >= 3) {
      this.socialservice.addcomment(this.comment, this.itemId).subscribe(response => { this.comments.unshift(response) }, error => { console.log(error) });
    }
  }

}

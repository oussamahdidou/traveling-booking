import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SearchService } from '../services/search.service';
import { SocialService } from '../services/social.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AdsService } from '../services/ads.service';
import { TruncatePipe } from "../pipes/truncate.pipe";
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-entreprise',
  standalone: true,
  providers: [AuthService, SearchService, SocialService, AdsService],
  templateUrl: './entreprise.component.html',
  styleUrl: './entreprise.component.css',
  imports: [HttpClientModule, RouterModule, FormsModule, CommonModule, TruncatePipe, HeaderComponent]
})
export class EntrepriseComponent implements OnInit {
  place: any;
  countries: any[] = [];
  cities: any[] = [];
  itemId: number = 22;
  comment: string = '';
  isLoggedIn: boolean = false;
  rating: number = 0;
  comments: any[] = [];
  news: any[] = [];
  constructor(private adsService: AdsService, public authservice: AuthService, private route: ActivatedRoute, private searchservice: SearchService, private socialservice: SocialService) { }
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.authservice.$isloggedin.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.route.params.subscribe(params => {
        this.itemId = params['id'];
        this.searchservice.PlaceById(this.itemId).subscribe(
          response => {
            this.place = response;
            this.enterpriseData.adress = response.adress;
            this.enterpriseData.bio = response.bio;
            this.enterpriseData.name = response.name;


          },
          error => {
            console.log(error)
          });
        this.adsService.getadsbyEntreprise(this.itemId).subscribe(
          response => {
            this.news = response;
            console.log(this.news)
          },
          error => {
            console.log(error);
          }
        )
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
    if (0 == this.place.ratings.length) {
      return 0;
    }
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
    else {
      Swal.fire({
        title: 'Please login',
        text: "You need to be logged",
        timer: 3000,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/auth/login';
        }
      })
    }


  }
  addcomment() {
    if (this.isLoggedIn) {
      if (this.comment.length >= 3) {
        this.socialservice.addcomment(this.comment, this.itemId).subscribe(response => { this.comments.unshift(response); this.comment = '' }, error => { console.log(error) });
      }
    }
    else {
      this.comment = ''
      Swal.fire({
        title: 'Please login',
        text: "You need to be logged",
        timer: 3000,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/auth/login';
        }
      })
    }
  }
  enterpriseData: any = {};
  showupdate: boolean = false;
  _showupdate() {
    this.showupdate = !this.showupdate;
  }
  onSubmit() {
    const formData = new FormData();
    for (const key in this.enterpriseData) {
      if (this.enterpriseData.hasOwnProperty(key)) {
        formData.append(key, this.enterpriseData[key]);
      }
    }
    this.searchservice.UpdatePlace(formData, this.itemId).subscribe(
      response => {
        console.log(response);
        this._showupdate()
      },
      error => {
        console.log(error)
      }
    )

  }
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.enterpriseData.image = file;
    }
  }
  getcity($event: any) {
    this.searchservice.GetCities($event.target.value).subscribe(response => {
      this.cities = response;
    },
      error => {
        console.log(error);
      });

  }
}

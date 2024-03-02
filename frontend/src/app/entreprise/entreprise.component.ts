import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SearchService } from '../services/search.service';
import { SocialService } from '../services/social.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-entreprise',
  standalone: true,
  providers: [AuthService, SearchService, SocialService],
  imports: [HttpClientModule, RouterModule],
  templateUrl: './entreprise.component.html',
  styleUrl: './entreprise.component.css'
})
export class EntrepriseComponent implements OnInit {
  place: any;
  constructor(private authservice: AuthService, private route: ActivatedRoute, private searchservice: SearchService, private socialservice: SocialService) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const itemId = params['id'];
      this.searchservice.PlaceById(itemId).subscribe(
        response => {
          this.place = response;
          console.log(this.place);
        },
        error => {
          console.log(error)
        });
    });
  }
  comments: any[] = [];


}

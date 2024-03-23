import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdsService } from '../../services/ads.service';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  providers: [AdsService],
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  enterpriseData: any = {};
  constructor(private adsService: AdsService, public authservice: AuthService, public router: Router) { }
  onSubmit() {
    const formData = new FormData();
    for (const key in this.enterpriseData) {
      if (this.enterpriseData.hasOwnProperty(key)) {
        formData.append(key, this.enterpriseData[key]);
      }
    }



    this.adsService.createad(formData).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/place/' + response.enterpriseId]);

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
}

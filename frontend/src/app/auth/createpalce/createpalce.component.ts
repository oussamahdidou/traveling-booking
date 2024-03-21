import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Map, MapStyle, Marker, config } from '@maptiler/sdk';

import '@maptiler/sdk/dist/maptiler-sdk.css';
import { SearchService } from '../../services/search.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-createpalce',
  standalone: true,
  providers: [AuthService, SearchService],
  imports: [FormsModule, HttpClientModule, RouterModule],
  templateUrl: './createpalce.component.html',
  styleUrl: './createpalce.component.css'
})
export class CreatepalceComponent implements OnInit, AfterViewInit, OnDestroy {
  map: Map | undefined;
  marker: Marker | undefined;
  countries: any[] = [];

  constructor(private router: Router, private searchservice: SearchService) {

  }
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    this.enterpriseData.villeId = 'city'

    config.apiKey = 'iB5Ts7o9guyw4uERNG3N';
    this.searchservice.GetCountries().subscribe(
      response => {
        this.countries = response;
      },
      error => { console.log(error) }
    )
  }

  ngAfterViewInit() {
    const initialState = { lng: -4.428498, lat: 31.927236, zoom: 14 };

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: MapStyle.STREETS,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });

    // Create the marker
    this.marker = new Marker({ color: "#FF0000" })
      .setLngLat([-4.428498, 31.927236])
      .addTo(this.map);

    // Add click event listener to the map
    this.map.on('click', (e) => {
      // Update marker position to the clicked coordinates
      if (this.marker) {
        this.marker.setLngLat(e.lngLat);
        console.log(e.lngLat);
        this.enterpriseData.longitude = e.lngLat.lng;
        this.enterpriseData.latitude = e.lngLat.lat;
      }
    });
  }
  cities: any[] = []
  getcity($event: any) {
    this.searchservice.GetCities($event.target.value).subscribe(response => {
      this.cities = response;
    },
      error => {
        console.log(error);
      });

  }
  ngOnDestroy() {
    this.map?.remove();
  }
  enterpriseData: any = {};
  showupdate: boolean = false;
  onSubmit() {
    const formData = new FormData();
    for (const key in this.enterpriseData) {
      if (this.enterpriseData.hasOwnProperty(key)) {
        formData.append(key, this.enterpriseData[key]);
      }
    }
    this.searchservice.CreatePlace(formData).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/place', response.id]);

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
  hasAllAttributes(obj: any): boolean {
    // List of attributes to check
    const requiredAttributes = ['villeId', 'name', 'adress', 'bio', 'type', 'supported', 'longitude', 'latitude', 'image'];

    // Check if all attributes exist in the object
    for (const attr of requiredAttributes) {
      if (!(attr in obj)) {
        return false;
      }
    }
    return true;
  }

}

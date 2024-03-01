import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Map, MapStyle, Marker, config } from '@maptiler/sdk';

import '@maptiler/sdk/dist/maptiler-sdk.css';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  map: Map | undefined;
  marker: Marker | undefined;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    config.apiKey = 'iB5Ts7o9guyw4uERNG3N';
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
      }
    });
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityComponent } from './city/city.component';
import { LocationComponent } from './location/location.component';
import { QueryComponent } from './query/query.component';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
const routes: Routes = [
  {
    path: '',
    children: [


      { path: 'city/:id', component: CityComponent },
      { path: 'location/:lat/:lng', component: LocationComponent },
      { path: 'query/:query', component: QueryComponent },
      { path: 'map', component: MapComponent }
    ],
  },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    RouterModule.forChild(routes),

  ]
})
export class SearchModule { }

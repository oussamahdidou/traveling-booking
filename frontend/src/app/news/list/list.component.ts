import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  pub: any[] = [
    { title: "publication title", description: "description de la publication" },
    { title: "publication title", description: "description de la publication" },
    { title: "publication title", description: "description de la publication" },
    { title: "publication title", description: "description de la publication" },


  ];
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
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

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-query',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './query.component.html',
  styleUrl: './query.component.css'
})
export class QueryComponent {
  movetonext() {
    if (this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0;
    }
    else {
      this.selectedIndex++;
    }

  }
  selectedIndex: number = 0;
  images: string[] = [
    "https://assets.kerzner.com/api/public/content/22a13cd86bef48b28e9ff17642419a6c?v=abeba10a&t=w2880",
    "https://www.dubai.it/fr/wp-content/uploads/sites/143/dubai-marina-hd.jpg",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/421989365.jpg?k=bb89cd96908bc50546bbeac16ca7c556cb3d29a198ec546b0dcc386ce508c005&o=&hp=1",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV3aA4zUsLFgoi9HYjMklH4GXlnFUySfq-9Q&usqp=CAU",
    "https://reloadvisor.org/wp-content/uploads/2019/10/Dubai-ReloAdvisor.org_.jpg",
  ];

}

import { Component, Input } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SlickCarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000
  };

  slides = [
    { img: 'https://via.placeholder.com/600x400', alt: 'Placeholder 1' },
    { img: 'https://via.placeholder.com/600x400', alt: 'Placeholder 2' },
    { img: 'https://via.placeholder.com/600x400', alt: 'Placeholder 3' }
  ];

}

import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-main-slider',
  imports: [CarouselModule],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.css'
})
export class MainSliderComponent {
      customOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: true,
      margin:7,
      autoplay:true,
      autoplaySpeed:2000,
      autoplayTimeout: 2000,
      navSpeed: 1000,
      autoplayHoverPause:true,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1,
        }
      },
      nav: false,
    };

}

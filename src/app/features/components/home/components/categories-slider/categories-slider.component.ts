import { Component } from '@angular/core';
import { ICategory } from '../../../../../core/interfaces/icategory.interface';
import { CategoriesService } from '../../../../../shared/services/Categories/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-categories-slider',
  imports: [CarouselModule],
  templateUrl: './categories-slider.component.html',
  styleUrl: './categories-slider.component.css'
})
export class CategoriesSliderComponent {

    customOptions: OwlOptions = {
      loop: true,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1,
        },
        400: {
          items: 2,
        },
        740: {
          items: 3,
        },
        940: {
          items: 4,
        },
      },
      nav: true,
    };
  

  categories!: ICategory[];
  constructor(private _CategoriesService: CategoriesService) {}

  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
        console.log(res.data);
      },
      error: (res) => {
        console.log(res);
      },
    });
  }

}

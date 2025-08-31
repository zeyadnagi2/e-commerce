import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../shared/services/Categories/categories.service';
import { ICategory } from '../../../core/interfaces/icategory.interface';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
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

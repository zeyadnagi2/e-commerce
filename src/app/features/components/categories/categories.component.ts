// import { Component, OnInit } from '@angular/core';
// import { CategoriesService } from '../../../shared/services/Categories/categories.service';
// import { ICategory } from '../../../core/interfaces/icategory.interface';

// @Component({
//   selector: 'app-categories',
//   imports: [],
//   templateUrl: './categories.component.html',
//   styleUrl: './categories.component.css',
// })
// export class CategoriesComponent implements OnInit {
//   categories!: ICategory[];
//   constructor(private _CategoriesService: CategoriesService) {}

//   ngOnInit(): void {
//     this._CategoriesService.getAllCategories().subscribe({
//       next: (res) => {
//         this.categories = res.data;
//         console.log(res.data);
//       },
//       error: (res) => {
//         console.log(res);
//       },
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // for ngModel
import { CategoriesService } from '../../../shared/services/Categories/categories.service';
import { ICategory } from '../../../core/interfaces/icategory.interface';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
  standalone: true
})
export class CategoriesComponent implements OnInit {
  categories: ICategory[] = [];

  // Pagination state
  currentPage = 1;
  pageSize = 3; // default; user can change from the select

  constructor(private _CategoriesService: CategoriesService) {}

  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data ?? [];
        // clamp current page in case data length changed
        this.currentPage = Math.min(this.currentPage, this.totalPages || 1);
      },
      error: (err) => console.log(err),
    });
  }

  // Derived values
  get totalItems(): number {
    return this.categories?.length ?? 0;
  }

  get totalPages(): number {
    return this.totalItems ? Math.ceil(this.totalItems / this.pageSize) : 0;
  }

  get pagedCategories(): ICategory[] {
    if (!this.categories?.length) return [];
    const start = (this.currentPage - 1) * this.pageSize;
    return this.categories.slice(start, start + this.pageSize);
  }

  // Windowed page numbers (e.g., show up to 7 around current)
  get visiblePages(): number[] {
    const total = this.totalPages;
    if (total <= 1) return [];
    const windowSize = 7;
    const half = Math.floor(windowSize / 2);

    let start = Math.max(1, this.currentPage - half);
    let end = Math.min(total, start + windowSize - 1);
    // adjust start if we hit the end
    start = Math.max(1, end - windowSize + 1);

    const pages: number[] = [];
    for (let p = start; p <= end; p++) pages.push(p);
    return pages;
  }

  // Actions
  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  prevPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  onPageSizeChange(): void {
    // reset to first page when page size changes
    this.currentPage = 1;
  }
}

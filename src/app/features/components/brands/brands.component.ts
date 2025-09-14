import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../../shared/services/Brands/brands.service';
import { IBrands } from '../../../core/interfaces/ibrands.interface';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  constructor(private _BrandsService: BrandsService) {}
  brands!: IBrands[];

  ngOnInit(): void {
    this._BrandsService.GetAllBrands().subscribe({
      next: (res) => {
        console.log(res);
        this.brands = res.data;
      },
    });
  }
}

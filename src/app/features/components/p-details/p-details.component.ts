import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../shared/services/Products/products.service';
import { IProduct } from '../../../core/interfaces/iproduct.interface';

@Component({
  selector: 'app-p-details',
  imports: [],
  templateUrl: './p-details.component.html',
  styleUrl: './p-details.component.css',
})
export class PDetailsComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);

  productDetails:IProduct = {} as IProduct;
  productId!: string;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        this.productId = param.get('p_id')!;
      },
    });

    this._ProductsService.getSpacificProduct(this.productId).subscribe({
      next: (res) => {
        this.productDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

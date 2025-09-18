import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../shared/services/Products/products.service';
import { IProduct } from '../../../core/interfaces/iproduct.interface';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../shared/services/Cart/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-products',
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  constructor(private _ProductsService: ProductsService , private _CartService:CartService ,private _ToastrService: ToastrService) {}

  products!: IProduct[];

  ngOnInit(): void {
    this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

    addToCart(p_id: string) {
    this._CartService.AddProductToCart(p_id).subscribe({
      next: (res) => {
        console.log(res);
        this._CartService.cartCount.next(res.numOfCartItems);
        this._ToastrService.success(res.message, res.status);
      },
      error: (err) => {
        console.log(err); 
        this._ToastrService.error(err.error.message, err.error.statusMsg);
      },
    });
  }
}

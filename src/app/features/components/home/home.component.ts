import { Component, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from '../../../shared/services/Products/products.service';
import { IProduct } from '../../../core/interfaces/iproduct.interface';
import { CategoriesSliderComponent } from './components/categories-slider/categories-slider.component';
import { MainSliderComponent } from './components/main-slider/main-slider.component';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../shared/services/Cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  imports: [CategoriesSliderComponent, MainSliderComponent, CarouselModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(
    private _ToastrService: ToastrService,
    private _ProductsService: ProductsService,
    private _CartService: CartService
  ) {}

  products!: IProduct[];

  ngOnInit(): void {
    this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data;
        console.log(this.products);
      },
      error: (err) => {
        console.log(err);
        this._ToastrService.error(err.error.message, err.error.statusMsg);
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

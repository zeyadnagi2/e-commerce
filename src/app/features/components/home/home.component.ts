import { Component, Input, input, InputSignal, OnInit } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductsService } from '../../../shared/services/Products/products.service';
import { IProduct } from '../../../core/interfaces/iproduct.interface';
import { CategoriesSliderComponent } from './components/categories-slider/categories-slider.component';
import { MainSliderComponent } from './components/main-slider/main-slider.component';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../shared/services/Cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../shared/services/Wishlist/wishlist.service';
import { forkJoin } from 'rxjs';

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
    private _CartService: CartService,
    private _WishlistService: WishlistService
  ) {}

  FromParent: InputSignal<boolean> = input(false);

  products!: IProduct[];
  // keep wishlist product IDs for O(1) checks
  wishIds = new Set<string>();

  ngOnInit(): void {
    // Load products + wishlist together
    forkJoin({
      products: this._ProductsService.getAllProducts(),
      wishlist: this._WishlistService.GetLoggedUserWishlist(),
    }).subscribe({
      next: ({ products, wishlist }) => {
        this.products = products.data;

        // Adjust mapping to your API shape if needed
        const ids = (wishlist?.data ?? []).map(
          (item: any) => item._id ?? item.id ?? item.product?._id
        );
        this.wishIds = new Set(ids);
      },
      error: (err) => {
        console.log(err);
        this._ToastrService.error(
          err?.error?.message ?? 'Failed to load',
          err?.error?.statusMsg ?? ''
        );
      },
    });
  }

  isInWishlist(id: string) {
    return this.wishIds.has(id);
  }

  addToCart(p_id: string) {
    this._CartService.AddProductToCart(p_id).subscribe({
      next: (res) => {
        this._CartService.cartCount.next(res.numOfCartItems);
        this._ToastrService.success(res.message, res.status);
      },
      error: (err) => {
        this._ToastrService.error(err?.error?.message, err?.error?.statusMsg);
      },
    });
  }

  // Toggle with optimistic UI + rollback on error
  toggleWishlist(product: IProduct, ev: MouseEvent) {
    ev.stopPropagation();
    const id = product._id;

    if (this.isInWishlist(id)) {
      const next = new Set(this.wishIds);
      next.delete(id);
      this.wishIds = next;

      this._WishlistService.RemoveProductFromWishlist(id).subscribe({
        next: (res) => this._ToastrService.success(res.message, res.status),
        error: (err) => {
          const rollback = new Set(this.wishIds);
          rollback.add(id);
          this.wishIds = rollback;
          this._ToastrService.error(err?.error?.message, err?.error?.statusMsg);
        },
      });
    } else {
      const next = new Set(this.wishIds);
      next.add(id);
      this.wishIds = next;

      this._WishlistService.AddProductToWishlist(id).subscribe({
        next: (res) => this._ToastrService.success(res.message, res.status),
        error: (err) => {
          const rollback = new Set(this.wishIds);
          rollback.delete(id);
          this.wishIds = rollback;
          this._ToastrService.error(err?.error?.message, err?.error?.statusMsg);
        },
      });
    }
  }

  // (Optional) helps DOM diffing if you list many items
  trackById = (_: number, item: IProduct) => item._id;
}

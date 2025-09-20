import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../shared/services/Products/products.service';
import { IProduct } from '../../../core/interfaces/iproduct.interface';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../shared/services/Cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../shared/services/Wishlist/wishlist.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-products',
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _WishlistService: WishlistService
  ) {}

  products!: IProduct[];
  // IDs of products currently in wishlist
  wishIds = new Set<string>();

  ngOnInit(): void {
    // load products + wishlist together
    forkJoin({
      products: this._ProductsService.getAllProducts(),
      wishlist: this._WishlistService.GetLoggedUserWishlist(),
    }).subscribe({
      next: ({ products, wishlist }) => {
        this.products = products.data;
        // map to product IDs (adjust the accessor if your API differs)
        const ids = (wishlist.data ?? []).map(
          (item: any) => item._id ?? item.id ?? item.product?._id
        );
        this.wishIds = new Set(ids);
      },
      error: (err) => console.log(err),
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
        this._ToastrService.error(err.error.message, err.error.statusMsg);
      },
    });
  }

  toggleWishlist(product: IProduct, ev: MouseEvent) {
    ev.stopPropagation();

    const id = product._id;
    if (this.isInWishlist(id)) {
      // remove — optimistic UI
      const next = new Set(this.wishIds);
      next.delete(id);
      this.wishIds = next;

      this._WishlistService.RemoveProductFromWishlist(id).subscribe({
        next: (res) => this._ToastrService.success(res.message, res.status),
        error: (err) => {
          // rollback on error
          const rollback = new Set(this.wishIds);
          rollback.add(id);
          this.wishIds = rollback;
          this._ToastrService.error(err.error.message, err.error.statusMsg);
        },
      });
    } else {
      // add — optimistic UI
      const next = new Set(this.wishIds);
      next.add(id);
      this.wishIds = next;

      this._WishlistService.AddProductToWishlist(id).subscribe({
        next: (res) => this._ToastrService.success(res.message, res.status),
        error: (err) => {
          // rollback on error
          const rollback = new Set(this.wishIds);
          rollback.delete(id);
          this.wishIds = rollback;
          this._ToastrService.error(err.error.message, err.error.statusMsg);
        },
      });
    }
  }
}

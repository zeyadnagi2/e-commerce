import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/Cart/cart.service';
import { ICart } from '../../../core/interfaces/icart.interface';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);

  cartData: ICart = {} as ICart;

  ngOnInit(): void {
    this._CartService.GetLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartData = res.data;
      },
    });
  }

  changeCount(p_id: string, newCount: number) {
    this._CartService.UpdateCartProductQuantity(p_id, newCount).subscribe({
      next: (res) => {
        console.log(res);
        this.cartData = res.data;
        this._ToastrService.success(res.message, res.status);
      },
    });
  }

  deleteProduct(p_id: string) {
    this._CartService.RemoveSpecificCartItem(p_id).subscribe({
      next: (res) => {
        this._CartService.cartCount.next(res.numOfCartItems);
        console.log(res);
        this.cartData = res.data;
        this._ToastrService.success(res.message, res.status);
      },
    });
  }
}

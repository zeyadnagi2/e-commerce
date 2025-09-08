import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/Cart/cart.service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly _CartService = inject(CartService);

  ngOnInit(): void {
    this._CartService.GetLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

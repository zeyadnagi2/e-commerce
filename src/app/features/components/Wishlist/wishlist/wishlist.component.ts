import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../../../shared/services/Wishlist/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { IWishlist } from '../../../../core/interfaces/iwishlist.interface';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  private readonly _WishlistService = inject(WishlistService);
  private readonly _ToastrService = inject(ToastrService);

  wishData: IWishlist[] = [];

  ngOnInit(): void {
    this._WishlistService.GetLoggedUserWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.wishData = res.data;
      },
    });
  }

  deleteProduct(p_id:string){
    this._WishlistService.RemoveProductFromWishlist(p_id).subscribe({
      next:(res)=>{
        console.log(res);
        this.wishData = res.data;
        this._ToastrService.success(res.message, res.status);
      }
    })

  }
}

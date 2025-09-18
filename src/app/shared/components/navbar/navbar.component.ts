import { Component, input, InputSignal, OnInit } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { AuthService } from '../../../shared/services/authentication/auth.service';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from '../../services/Cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  constructor(
    private _CartService: CartService,
    private _flowbiteService: FlowbiteService,
    private _AuthService: AuthService,
    private _Router: Router,
    private _CookieService: CookieService
  ) {}

  cartBadge!: number;
  userName!: string;

  Check: InputSignal<boolean> = input(false);

  ngOnInit(): void {
    this._flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    if (this._CookieService.get('token')) {
      this._CartService.GetLoggedUserCart().subscribe({
        next: (res) => {
          this.cartBadge = res.numOfCartItems;
        },
      });
    }

    this._CartService.cartCount.subscribe({
      next: (value) => {
        this.cartBadge = value;
      },
    });
  }

  logOut() {
    this._Router.navigate(['/login']);
    this._CookieService.delete('token');
    this._AuthService.userInfo = null;
  }

  showName() {
    this._AuthService.decodeToken();
    this.userName = this._AuthService.userInfo.name;
    console.log(this._AuthService.userInfo.name);
  }
}

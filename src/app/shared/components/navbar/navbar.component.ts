import { Component } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { AuthService } from '../../../shared/services/authentication/auth.service';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private _flowbiteService: FlowbiteService, private _AuthService: AuthService , private _Router:Router ,private _CookieService:CookieService) {}

  userName!: string;

  ngOnInit(): void {
    this._flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  logOut(){
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

import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './core/components/login/login.component';
import { RegisterComponent } from './core/components/register/register.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { HomeComponent } from './features/components/home/home.component';
import { NotfoundComponent } from './features/components/notfound/notfound.component';
import { BrandsComponent } from './features/components/brands/brands.component';
import { CategoriesComponent } from './features/components/categories/categories.component';
import { CartComponent } from './features/components/cart/cart.component';
import { ProductsComponent } from './features/components/products/products.component';

export const routes: Routes = [

    {path:'' , redirectTo:'home' , pathMatch:'full'},

    {path:'' , component:AuthLayoutComponent , children:[
        {path: 'login' , component:LoginComponent , title:'Login'},
        {path: 'register' , component:RegisterComponent , title:'Register'}
    ]},

    {path:'' , component:MainLayoutComponent , children:[
        {path:'home' , component:HomeComponent , title:'Home'},
        {path:'brands' , component:BrandsComponent , title:'Brands'},
        {path:'categories' , component:CategoriesComponent , title:'Categories'},
        {path:'cart' , component:CartComponent , title:'Cart'},
        {path:'products' , component:ProductsComponent , title:'Products'},
        {path:'p-details/:p_id' , loadComponent: ()=> import('./features/components/p-details/p-details.component').then((c)=>c.PDetailsComponent) , title:'Product Details'},
        
    ]},
    {path:"**" , component:NotfoundComponent , title:'404'}

];

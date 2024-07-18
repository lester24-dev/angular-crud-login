import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { ProductComponent } from './user/product/product.component';
import { ProductsComponent } from './admin/products/products.component';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['your login page here']);

export const routes: Routes = [

    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },

    {
        path: 'login',
        pathMatch: 'full',
        component: LoginComponent
    },

    {
        path: 'register',
        pathMatch: 'full',
        redirectTo: 'register'
    },


    {
        path: 'admin',
        component: LayoutComponent,
        canActivate: [AngularFireAuthGuard],
        data: {
            layout: 'admin',
         
        },
        children: [
            {
                path:'dashboard',
                component: AdminDashboardComponent
            },
            {
                path:'product',
                component: ProductsComponent
            }
        ]
    },

    {
        path: 'user',
        component: LayoutComponent,
        canActivate: [AngularFireAuthGuard],
        data: {
            layout: 'user',
            authGuardPipe: redirectUnauthorizedToLogin
        },
        children:[
           
            {
                path:'dashbaord',
                component: UserDashboardComponent
            },
            {
                path:'product',
                component: ProductComponent
            }
        ]
    },
];

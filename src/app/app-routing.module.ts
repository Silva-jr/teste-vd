import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';
import { AuthGuard } from './security/auth.guard';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
    {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full',
  },
  {
    path: '',    
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'users',
        loadChildren: () =>
        import('./users/users.module').then((m)=>m.UsersModule),
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'pages',
        loadChildren: () =>
          import('./Page/pages.module').then((m) => m.PagesModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

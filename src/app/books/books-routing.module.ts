import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooksPage } from './books.page';

// const routes: Routes = [
//   {
//     path: '',
//     component: BooksPage
//   },
//   {
//     path: 'explore',
//     loadChildren: () => import('./explore/explore.module').then( m => m.ExplorePageModule)
//   },
//   {
//     path: 'saved',
//     loadChildren: () => import('./saved/saved.module').then( m => m.SavedPageModule)
//   }

// ];

const routes: Routes = [
  {
    path: 'tabs',
    component: BooksPage,
    children: [
      {
        path: 'explore',
        loadChildren: () =>
          import('./explore/explore.module').then((m) => m.ExplorePageModule),
      },
      {
        path: 'saved',
        loadChildren: () =>
          import('./saved/saved.module').then((m) => m.SavedPageModule),
      },
      {
        path: '',
        redirectTo: '/books/tabs/explore',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/books/tabs/explore',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksPageRoutingModule {}

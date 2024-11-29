import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedListComponent } from './core/components/feed-list/feed-list.component';

const routes: Routes = [
  {
    path: 'feed',
    component: FeedListComponent
  },
  {
    path: '**',
    redirectTo: 'feed'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './shell/page/news/news.component';

const routes: Routes = [
  { path: '', redirectTo: '/news/', pathMatch: 'full' },
  { path: 'news/:type', component: NewsComponent },
  { path: '**', redirectTo: '/news/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

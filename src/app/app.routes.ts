import { Routes } from '@angular/router';
import { NewsComponent } from './shell/page/news/news.component';

export const routes: Routes = [
  { path: '', redirectTo: '/news/', pathMatch: 'full' },
  { path: 'news/:type', component: NewsComponent },
  { path: '**', redirectTo: '/news/', pathMatch: 'full' }
];

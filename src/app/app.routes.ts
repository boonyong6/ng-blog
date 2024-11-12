import { Routes } from '@angular/router';
import { HomeComponent } from './home/feature/home.component';
import { PageNotFoundComponent } from './page-not-found/feature/page-not-found.component';
import { AboutComponent } from './about/feature/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: PageNotFoundComponent },
];

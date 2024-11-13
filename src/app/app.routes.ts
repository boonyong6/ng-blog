import { Routes } from '@angular/router';
import { HomeComponent } from './home/feature/home.component';
import { PageNotFoundComponent } from './page-not-found/feature/page-not-found.component';
import { AboutComponent } from './about/feature/about.component';
import { PostListComponent } from './posts/feature/post-list/post-list.component';

const getFullTitle = (title: string) => `${title} • Blog`;

export const routes: Routes = [
  { path: '', component: HomeComponent, title: getFullTitle('Home') },
  { path: 'blog', component: PostListComponent, title: getFullTitle('blog') },
  { path: 'about', component: AboutComponent, title: getFullTitle('About') },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: getFullTitle('Not Found'),
  },
];

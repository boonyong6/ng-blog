import { Routes } from '@angular/router';
import { HomeComponent } from './home/feature/home.component';
import { PageNotFoundComponent } from './page-not-found/feature/page-not-found.component';
import { AboutComponent } from './about/feature/about.component';
import { PostListComponent } from './posts/feature/post-list/post-list.component';
import { TagListComponent } from './tags/feature/tag-list/tag-list.component';

// TODO: https://angular.dev/guide/routing/common-router-tasks#setting-the-page-title
const getFullTitle = (title: string) => `${title} • Blog`;

export const routes: Routes = [
  { path: '', component: HomeComponent, title: getFullTitle('Home') },
  {
    path: 'blog/page/:pageNum',
    component: PostListComponent,
    title: getFullTitle('blog'),
  },
  { path: 'tags', component: TagListComponent, title: getFullTitle('Tags') },
  {
    path: 'tags/:tagSlug/page/:pageNum',
    component: PostListComponent,
    title: getFullTitle('Posts by tag'),
  },
  { path: 'about', component: AboutComponent, title: getFullTitle('About') },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: getFullTitle('Not Found'),
  },
];

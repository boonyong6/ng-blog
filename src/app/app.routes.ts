import { Routes } from '@angular/router';
import { HomeComponent } from './home/feature/home.component';
import { NotFoundComponent } from './not-found/feature/not-found/not-found.component';
import { AboutComponent } from './about/feature/about.component';
import { PostListComponent } from './posts/feature/post-list/post-list.component';
import { TagListComponent } from './tags/feature/tag-list/tag-list.component';
import { PostDetailComponent } from './posts/feature/post-detail/post-detail.component';
import { ProjectListComponent } from './projects/feature/project-list/project-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  {
    path: 'blog/page/:pageNum',
    component: PostListComponent,
    title: 'blog',
  },
  { path: 'tags', component: TagListComponent, title: 'Tags' },
  {
    path: 'tags/:tagSlug/page/:pageNum',
    component: PostListComponent,
    title: 'Posts by tag',
  },
  {
    path: 'posts/:year/:month/:day/:slug',
    component: PostDetailComponent,
    title: 'Post Detail',
  },
  { path: 'about', component: AboutComponent, title: 'About' },
  {
    path: 'not-found',
    component: NotFoundComponent,
    title: 'Not Found',
  },
  {
    path: 'projects',
    component: ProjectListComponent,
    title: 'Projects',
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

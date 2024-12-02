import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { PostService } from '../../posts/data-access/post.service';
import { Post } from '../../posts/data-access/types';
import { PostListItemComponent } from '../../posts/ui/post-list-item/post-list-item.component';
import { Page } from '../../shared/data-access/types';
import { RestoreScrollPositionDirective } from '../../shared/utils/directives/restore-scroll-position.directive';

@Component({
  selector: 'app-home',
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    PostListItemComponent,
    RestoreScrollPositionDirective,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  posts$!: Observable<Page<Post>>;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.posts$ = this.postService.getLatestPosts();
  }
}

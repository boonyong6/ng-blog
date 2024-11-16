import { Component } from '@angular/core';
import { PostService } from '../../posts/data-access/post.service';
import { Observable } from 'rxjs';
import { Page } from '../../shared/data-access/types';
import { AsyncPipe } from '@angular/common';
import { PostListItemComponent } from '../../posts/ui/post-list-item/post-list-item.component';
import { Post } from '../../posts/data-access/post';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    PostListItemComponent,
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

import { Component } from '@angular/core';
import { PostService } from '../../posts/data-access/post.service';
import { Observable } from 'rxjs';
import { Page } from '../../shared/data-access/types';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe],
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

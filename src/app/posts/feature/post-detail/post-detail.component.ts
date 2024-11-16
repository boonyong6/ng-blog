import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../../data-access/post';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostService } from '../../data-access/post.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { TagLinkComponent } from '../../../tags/ui/tag-link/tag-link.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    DatePipe,
    MatButtonModule,
    MatIconModule,
    TagLinkComponent,
  ],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css',
})
export class PostDetailComponent implements OnInit, OnDestroy {
  post$!: Observable<Post>;
  destroyed = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    const apiUrl = history.state.apiUrl;

    this.route.params.pipe(takeUntil(this.destroyed)).subscribe((params) => {
      this.post$ = this.postService.getPost({
        url: apiUrl,
        year: params['year'],
        month: params['month'],
        day: params['day'],
        slug: params['slug'],
      });
    });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}

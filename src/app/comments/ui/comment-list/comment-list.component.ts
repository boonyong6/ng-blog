import { CommonModule, DatePipe } from '@angular/common';
import { Component, DestroyRef, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { finalize, Observable } from 'rxjs';
import { CommentService } from '../../data-access/comment.service';
import { Comment } from '../../data-access/types';
import { Paginator } from '../../../shared/utils/paginator';
import { Page } from '../../../shared/data-access/types';
import { Store } from '@ngrx/store';
import {
  enable,
  disable,
} from '../../../shared/data-access/loading-overlay.actions';

@Component({
  selector: 'app-comment-list',
  imports: [CommonModule, DatePipe, MatButtonModule, MatIconModule],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css',
})
export class CommentListComponent implements OnInit {
  @Input() postId!: number;
  paginator!: Paginator<Comment>;
  isLoaded = false;

  constructor(
    private commentService: CommentService,
    private destroyRef: DestroyRef,
    private store: Store,
  ) {
    this.destroyRef.onDestroy(() => {
      this.paginator.destroy();
    });
  }

  get comments(): Comment[] {
    return this.paginator.data;
  }

  ngOnInit(): void {
    this.paginator = new Paginator(this.getCommentPage$());
  }

  addComment(comment: Comment) {
    this.paginator.count++;

    const isLastPage = !this.paginator.hasNext();
    if (isLastPage) {
      this.paginator.data.push(comment);
    }
  }

  loadMoreComments(): void {
    this.paginator.loadNext((nextUrl) => this.getCommentPage$(nextUrl ?? ''));
  }

  private getCommentPage$(url?: string): Observable<Page<Comment>> {
    this.store.dispatch(disable());
    this.isLoaded = false;

    return this.commentService.getComments({ url, postId: this.postId }).pipe(
      finalize(() => {
        this.store.dispatch(enable());
        this.isLoaded = true;
      }),
    );
  }
}

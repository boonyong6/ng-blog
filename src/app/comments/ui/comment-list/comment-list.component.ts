import { CommonModule, DatePipe } from '@angular/common';
import { Component, DestroyRef, Input, OnInit } from '@angular/core';
import { Comment } from '../../data-access/types';
import { CommentService } from '../../data-access/comment.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-comment-list',
  imports: [CommonModule, DatePipe],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css',
})
export class CommentListComponent implements OnInit {
  @Input() postId!: number;
  comments: Comment[] = [];
  commentsNextUrl: string | null = null;

  constructor(
    private commentService: CommentService,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.commentService
      .getComments({ postId: this.postId })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((commentPage) => {
        this.comments.push(...commentPage.results);
        this.commentsNextUrl = commentPage.next;
      });
  }

  addComment(comment: Comment) {
    this.comments.push(comment);
  }
}

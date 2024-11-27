import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommentService } from '../../data-access/comment.service';
import { Comment } from '../../data-access/types';

@Component({
  selector: 'app-comment-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css',
})
export class CommentFormComponent {
  @Input() postId!: number;
  @Output() commentCreated = new EventEmitter<Comment>();

  commentService = inject(CommentService);
  destroyRef = inject(DestroyRef);
  formBuilder = inject(FormBuilder);

  commentForm = this.formBuilder.nonNullable.group({
    name: [''],
    body: ['', Validators.required],
  });

  get body() {
    return this.commentForm.get('body');
  }

  addComment() {
    if (!this.commentForm.valid) {
      return;
    }

    this.commentService
      .createComment({
        ...this.commentForm.getRawValue(),
        postId: this.postId,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((comment) => {
        this.commentCreated.emit(comment);
        this.commentForm.reset();
      });
  }
}

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
  formBuilder = inject(FormBuilder);
  commentForm = this.formBuilder.group({
    name: [''],
    body: ['', Validators.required],
  });

  get body() {
    return this.commentForm.get('body');
  }

  addComment() {
    this.commentForm.reset();
    console.log('Save comment and add it to the list.');
    console.log(this.commentForm.value);
  }
}

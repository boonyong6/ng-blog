import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-comment-list',
  imports: [DatePipe],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css',
})
export class CommentListComponent {}

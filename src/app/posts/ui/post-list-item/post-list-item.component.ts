import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../data-access/post';
import { DatePipe, NgClass, UpperCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UrlHelper } from '../../utils/url-helper';

@Component({
  selector: 'app-post-list-item',
  standalone: true,
  imports: [
    DatePipe,
    UpperCasePipe,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    NgClass,
  ],
  templateUrl: './post-list-item.component.html',
  styleUrl: './post-list-item.component.css',
})
export class PostListItemComponent implements OnInit {
  @Input() post!: Post;
  @Input() isFullWidth: boolean = true;
  postUrl: string = '';
  UrlHelper = UrlHelper;

  ngOnInit(): void {
    this.postUrl = UrlHelper.populatePostUrl(this.post);
  }
}

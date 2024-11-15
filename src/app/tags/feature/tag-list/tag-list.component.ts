import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../posts/data-access/post.service';
import { map, Observable } from 'rxjs';
import { Page, Tag } from '../../../shared/data-access/types';
import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tag-list',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    UpperCasePipe,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.css',
})
export class TagListComponent implements OnInit {
  tagPage$!: Observable<Page<Tag>>;
  tags: Tag[] = [];
  tagsNextUrl: string | null = null;
  curPage: number = 1;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadTags();
  }

  public loadTags(page: number = 1) {
    this.tagPage$ = this.postService.getTags({ page }).pipe(
      map((tagPage) => {
        this.tags.push(...tagPage.results);
        this.tagsNextUrl = tagPage.next;
        return tagPage;
      })
    );
  }

  public loadMoreTags() {
    this.curPage++;
    this.loadTags(this.curPage);
  }
}

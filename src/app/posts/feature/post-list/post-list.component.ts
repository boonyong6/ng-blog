import { Component, OnDestroy, OnInit } from '@angular/core';
import { TagSidenavComponent } from '../../../shared/ui/tag-sidenav/tag-sidenav.component';
import { Page, Tag } from '../../../shared/data-access/types';
import { MatButtonModule } from '@angular/material/button';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Post } from '../../data-access/post';
import { PostService } from '../../data-access/post.service';
import { AsyncPipe } from '@angular/common';
import { PostListItemComponent } from '../../ui/post-list-item/post-list-item.component';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    MatButtonModule,
    TagSidenavComponent,
    PostListItemComponent,
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent implements OnInit, OnDestroy {
  curPage: number = 1;
  tagSlug?: string;

  tags: Tag[] = [];
  tagsNextUrl: string | null = null;
  postPage$!: Observable<Page<Post>>;
  destroyed = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroyed)).subscribe((params) => {
      this.curPage = +params['pageNum'] || 1;
      this.tagSlug = params['tagSlug'];

      this.postPage$ = this.postService.getPosts({
        page: this.curPage,
        tagSlug: this.tagSlug,
      });
    });

    this._loadTags();
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  public calculateTotalPage(totalCount: number, pageSize: number) {
    return Math.ceil(totalCount / pageSize);
  }

  public loadMoreTags() {
    if (this.tagsNextUrl == null) {
      return;
    }
    this._loadTags(this.tagsNextUrl);
  }

  private _loadTags(url: string = '') {
    this.postService
      .getTags({ url })
      .pipe(takeUntil(this.destroyed))
      .subscribe((value) => {
        this.tags.push(...value.results);
        this.tagsNextUrl = value.next;
      });
  }
}
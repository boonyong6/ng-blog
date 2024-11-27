import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TagSidenavComponent } from '../../../shared/ui/tag-sidenav/tag-sidenav.component';
import { Page, Tag } from '../../../shared/data-access/types';
import { MatButtonModule } from '@angular/material/button';
import { Observable, tap } from 'rxjs';
import { Post } from '../../data-access/types';
import { PostService } from '../../data-access/post.service';
import { AsyncPipe, UpperCasePipe, ViewportScroller } from '@angular/common';
import { PostListItemComponent } from '../../ui/post-list-item/post-list-item.component';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-list',
  imports: [
    RouterLink,
    AsyncPipe,
    UpperCasePipe,
    MatButtonModule,
    TagSidenavComponent,
    PostListItemComponent,
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent implements OnInit {
  curPage: number = 1;
  tagSlug?: string;
  tagName: string = '';
  prevPageUrl: string | null = null;
  nextPageUrl: string | null = null;

  tags: Tag[] = [];
  tagsNextUrl: string | null = null;
  postPage$!: Observable<Page<Post>>;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private viewportScroller: ViewportScroller,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.curPage = +params['pageNum'] || 1;
        this.tagSlug = params['tagSlug'];
        this.tagName = this.tagSlug ? this.tagSlug.replaceAll('-', ' ') : '';

        const basePageUrl = this.tagSlug
          ? `/tags/${this.tagSlug}/page`
          : `/blog/page`;
        this.prevPageUrl = `${basePageUrl}/${this.curPage - 1}`;
        this.nextPageUrl = `${basePageUrl}/${this.curPage + 1}`;

        this.postPage$ = this.postService
          .getPosts({
            page: this.curPage,
            tagSlug: this.tagSlug,
          })
          .pipe(
            tap(() => {
              // TODO: Restore scroll position on back navigation.
              this.viewportScroller.scrollToPosition([0, 0]);
            }),
          );
      });

    this.loadTags();
  }

  public calculateTotalPage(totalCount: number, pageSize: number) {
    return Math.ceil(totalCount / pageSize);
  }

  public loadMoreTags() {
    if (this.tagsNextUrl == null) {
      return;
    }
    this.loadTags(this.tagsNextUrl);
  }

  private loadTags(url: string = '') {
    this.postService
      .getTags({ url })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.tags.push(...value.results);
        this.tagsNextUrl = value.next;
      });
  }
}

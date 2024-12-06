import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Page, Tag } from '../../../shared/data-access/types';
import { TagSidenavComponent } from '../../../shared/ui/tag-sidenav/tag-sidenav.component';
import { RestoreScrollPositionDirective } from '../../../shared/utils/directives/restore-scroll-position.directive';
import { Paginator } from '../../../shared/utils/paginator';
import { PostService } from '../../data-access/post.service';
import { Post } from '../../data-access/types';
import { PostListItemComponent } from '../../ui/post-list-item/post-list-item.component';

@Component({
  selector: 'app-post-list',
  imports: [
    RouterLink,
    AsyncPipe,
    UpperCasePipe,
    MatButtonModule,
    TagSidenavComponent,
    PostListItemComponent,
    RestoreScrollPositionDirective,
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

  tagPaginator!: Paginator<Tag>;
  postPage$!: Observable<Page<Post>>;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private destroyRef: DestroyRef,
  ) {
    this.destroyRef.onDestroy(() => {
      this.tagPaginator.destroy();
    });
  }

  get tags(): Tag[] {
    return this.tagPaginator.data;
  }

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

        this.postPage$ = this.postService.getPosts({
          page: this.curPage,
          tagSlug: this.tagSlug,
        });
      });

    this.tagPaginator = new Paginator(this.getTagPage$());
  }

  public calculateTotalPage(totalCount: number, pageSize: number): number {
    return Math.ceil(totalCount / pageSize);
  }

  public loadMoreTags(): void {
    this.tagPaginator.loadNext((nextUrl) => this.getTagPage$(nextUrl));
  }

  private getTagPage$(url?: string): Observable<Page<Tag>> {
    return this.postService.getTags({ url });
  }
}

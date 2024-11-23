import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../../data-access/post';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostService } from '../../data-access/post.service';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { AsyncPipe, DatePipe, ViewportScroller } from '@angular/common';
import { TagLinkComponent } from '../../../tags/ui/tag-link/tag-link.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownComponent } from 'ngx-markdown';
import { ClipboardButtonComponent } from '../../../shared/ui/clipboard-button/clipboard-button.component';
import { Title } from '@angular/platform-browser';
import { environment as env } from '../../../../environments/environment';
import { Page } from '../../../shared/data-access/types';
import { UrlHelper } from '../../utils/url-helper';

@Component({
    selector: 'app-post-detail',
    imports: [
        RouterLink,
        AsyncPipe,
        DatePipe,
        MatButtonModule,
        MatIconModule,
        MarkdownComponent,
        TagLinkComponent,
    ],
    templateUrl: './post-detail.component.html',
    styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit, OnDestroy {
  urlFragment: string | null = null;
  post$!: Observable<Post>;
  similarPostPage$!: Observable<Page<Post>>;
  destroyed = new Subject<void>();
  readonly clipboardButton = ClipboardButtonComponent;
  readonly UrlHelper = UrlHelper;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private viewportScroller: ViewportScroller,
    public titleService: Title,
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroyed)).subscribe((params) => {
      const getParams = {
        year: params['year'],
        month: params['month'],
        day: params['day'],
        slug: params['slug'],
      };

      this.post$ = this.postService.getPost(getParams).pipe(
        tap((post) => {
          this.titleService.setTitle(`${post.title}${env.documentTitleSuffix}`);
        }),
      );

      this.similarPostPage$ = this.postService.getSimilarPosts(getParams);
    });

    this.route.fragment
      .pipe(takeUntil(this.destroyed))
      .subscribe((urlFragment) => {
        this.urlFragment = urlFragment;
      });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  scrollToFragment() {
    // Manually delay until markdown is fully rendered in the DOM.
    setTimeout(() => {
      this.viewportScroller.scrollToAnchor(this.urlFragment ?? '');
    }, 100);
  }
}

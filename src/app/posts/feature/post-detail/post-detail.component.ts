import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Post } from '../../data-access/types';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostService } from '../../data-access/post.service';
import { debounceTime, fromEvent, Observable, tap } from 'rxjs';
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
  styleUrl: './post-detail.component.css',
})
export class PostDetailComponent implements OnInit {
  urlFragment: string | null = null;
  post$!: Observable<Post>;
  similarPostPage$!: Observable<Page<Post>>;
  readonly clipboardButton = ClipboardButtonComponent;
  readonly UrlHelper = UrlHelper;
  isScrolling = false;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private viewportScroller: ViewportScroller,
    private destroyRef: DestroyRef,
    public titleService: Title,
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const getParams = {
          year: params['year'],
          month: params['month'],
          day: params['day'],
          slug: params['slug'],
        };

        this.post$ = this.postService.getPost(getParams).pipe(
          tap((post) => {
            this.titleService.setTitle(
              `${post.title}${env.documentTitleSuffix}`,
            );
          }),
        );

        this.similarPostPage$ = this.postService.getSimilarPosts(getParams);
      });

    this.route.fragment
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((urlFragment) => {
        this.urlFragment = urlFragment;
      });

    fromEvent(window, 'scroll')
      .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(300))
      .subscribe(() => {
        if (window.scrollY === 0) {
          this.isScrolling = false;
          return;
        }

        this.isScrolling = true;
      });
  }

  scrollToFragment() {
    // Manually delay until markdown is fully rendered in the DOM.
    setTimeout(() => {
      this.viewportScroller.scrollToAnchor(this.urlFragment ?? '');
    }, 100);
  }

  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}

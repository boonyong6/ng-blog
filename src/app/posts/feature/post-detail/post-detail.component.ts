import { AsyncPipe, DatePipe, ViewportScroller } from '@angular/common';
import {
  Component,
  DestroyRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { debounceTime, fromEvent, Observable, tap, timer } from 'rxjs';
import { environment as env } from '../../../../environments/environment';
import { Comment } from '../../../comments/data-access/types';
import { CommentFormComponent } from '../../../comments/ui/comment-form/comment-form.component';
import { CommentListComponent } from '../../../comments/ui/comment-list/comment-list.component';
import { Page } from '../../../shared/data-access/types';
import { ClipboardButtonComponent } from '../../../shared/ui/clipboard-button/clipboard-button.component';
import { RestoreScrollPositionDirective } from '../../../shared/utils/directives/restore-scroll-position.directive';
import { WINDOW } from '../../../shared/utils/injection-tokens';
import { TagLinkComponent } from '../../../tags/ui/tag-link/tag-link.component';
import { PostService } from '../../data-access/post.service';
import { Post } from '../../data-access/types';
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
    CommentListComponent,
    CommentFormComponent,
    RestoreScrollPositionDirective,
  ],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css',
})
export class PostDetailComponent implements OnInit {
  urlFragment: string | null = null;
  post$!: Observable<Post>;
  similarPostPage$!: Observable<Page<Post>>;
  isScrolling = false;
  restoreScrollPositionDelay$ = timer(100);
  @ViewChild(CommentListComponent) commentList!: CommentListComponent;
  readonly clipboardButton = ClipboardButtonComponent;
  readonly UrlHelper = UrlHelper;

  constructor(
    public titleService: Title,
    public viewportScroller: ViewportScroller,
    private route: ActivatedRoute,
    private postService: PostService,
    private destroyRef: DestroyRef,
    @Inject(WINDOW) private window: Window,
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

    fromEvent(this.window, 'scroll')
      .pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (this.window.scrollY === 0) {
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

  addCommentToList(comment: Comment) {
    this.commentList.addComment(comment);
  }
}

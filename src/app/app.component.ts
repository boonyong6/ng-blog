import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AsyncPipe, CommonModule, NgOptimizedImage } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { map, Subject, takeUntil } from 'rxjs';
import { LoadingService } from './shared/data-access/loading.service';
import { LoadingOverlayComponent } from './shared/ui/loading-overlay/loading-overlay.component';
import { MatDialog } from '@angular/material/dialog';
import { SearchResult } from './shared/ui/search-dialog/types';
import { SearchDialogComponent } from './shared/ui/search-dialog/search-dialog.component';
import { PostService } from './posts/data-access/post.service';
import { UrlHelper } from './posts/utils/url-helper';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    NgOptimizedImage,
    CommonModule,
    AsyncPipe,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    LoadingOverlayComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'ng-blog';
  isDarkMode;
  socialLinks = [
    {
      url: 'https://github.com/boonyong6/ng-blo',
      logoUrl: 'icons/github.svg',
      description: 'GitHub link',
    },
    {
      url: 'https://www.linkedin.com/in/boonyongkang/',
      logoUrl: 'icons/linkedin.svg',
      description: 'LinkedIn link',
    },
  ];
  menuItems = [
    {
      name: 'Home',
      url: '/',
    },
    {
      name: 'Blog',
      url: '/blog/page/1',
    },
    {
      name: 'Tags',
      url: '/tags',
    },
    {
      name: 'Projects',
      url: '/projects',
    },
    {
      name: 'About',
      url: '/about',
    },
  ];

  @ViewChild(MatDrawer) drawer!: MatDrawer;
  private destroyed = new Subject<void>();
  public isSearchDialogOpened = false;

  constructor(
    mediaMatcher: MediaMatcher,
    private router: Router,
    public loadingService: LoadingService,
    private changeDetectorRef: ChangeDetectorRef,
    private dialogService: MatDialog,
    private postService: PostService
  ) {
    this.isDarkMode = mediaMatcher.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
  }

  ngOnInit() {
    this.router.events.pipe(takeUntil(this.destroyed)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.drawer.close();
      }
    });

    // ! For testing only.
    // this.openSearchDialog();
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  ngAfterViewInit() {
    // Subscribe to loading changes to trigger manual detection
    this.loadingService.isLoading$
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => {
        this.changeDetectorRef.detectChanges();
      });
  }

  openSearchDialog() {
    if (this.isSearchDialogOpened) {
      return;
    }

    const searchResults$ = this.postService.getLatestPosts().pipe(
      map((postPage) => {
        const searchResults: SearchResult[] = postPage.results.map((post) => {
          return {
            date: post.publish,
            title: post.title,
            url: UrlHelper.populatePostUrl(post),
          };
        });

        return searchResults;
      })
    );

    const dialogRef = this.dialogService.open(SearchDialogComponent, {
      data: { searchResults$ },
    });
    this.isSearchDialogOpened = true;

    dialogRef.beforeClosed().subscribe(() => {
      this.isSearchDialogOpened = false;
    });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardShortcut(evt: KeyboardEvent) {
    if (evt.ctrlKey && evt.key === 'k') {
      evt.preventDefault();
      this.openSearchDialog();
    }
  }
}

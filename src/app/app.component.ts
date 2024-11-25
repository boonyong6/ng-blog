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
import { AsyncPipe, CommonModule, NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { LoadingOverlayComponent } from './shared/ui/loading-overlay/loading-overlay.component';
import {
  SearchResult,
  SearchResultItem,
} from './shared/ui/search-dialog/types';
import { SearchDialogComponent } from './shared/ui/search-dialog/search-dialog.component';
import { UrlHelper } from './posts/utils/url-helper';
import { PostService } from './posts/data-access/post.service';
import { LoadingService } from './shared/data-access/loading.service';
import { ThemeService } from './shared/data-access/theme.service';
import { ThemeMode } from './shared/data-access/types';
import { siteMetadata } from './site-metadata';

@Component({
  selector: 'app-root',
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
    MatMenuModule,
    LoadingOverlayComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'ng-blog';
  socialLinks = siteMetadata.socialLinks;
  menuItems = siteMetadata.menuItems;
  ThemeMode = ThemeMode;

  @ViewChild(MatDrawer) drawer!: MatDrawer;
  private destroyed = new Subject<void>();
  public isSearchDialogOpened = false;

  constructor(
    public themeService: ThemeService,
    private router: Router,
    public loadingService: LoadingService,
    private changeDetectorRef: ChangeDetectorRef,
    private dialogService: MatDialog,
    private postService: PostService,
  ) {}

  ngOnInit() {
    this.router.events.pipe(takeUntil(this.destroyed)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.drawer.close();
      }
    });
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

    const dialogRef = this.dialogService.open(SearchDialogComponent);
    this.isSearchDialogOpened = true;

    const dialogComponent = dialogRef.componentInstance;
    dialogComponent.appendSearchResult(this.getSearchResult());

    dialogComponent.searchInputChanged.subscribe((searchQuery: string) => {
      dialogComponent.appendSearchResult(this.getSearchResult({ searchQuery }));
    });

    dialogComponent.nextPageTriggered.subscribe((nextUrl) => {
      dialogComponent.appendSearchResult(
        this.getSearchResult({ url: nextUrl }),
      );
    });

    dialogRef.beforeClosed().subscribe(() => {
      this.isSearchDialogOpened = false;
    });
  }

  private getSearchResult(
    params: { searchQuery?: string; url?: string } = {},
  ): Observable<SearchResult> {
    const { searchQuery, url } = params;

    let postPage$ =
      searchQuery || url
        ? this.postService.searchPosts({ url, query: searchQuery })
        : this.postService.getLatestPosts();

    return postPage$.pipe(
      map((postPage) => {
        const items: SearchResultItem[] = postPage.results.map((post) => {
          return {
            date: post.publish,
            title: post.title,
            url: UrlHelper.populatePostUrl(post),
          };
        });

        return {
          items,
          next: postPage.next,
        };
      }),
    );
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardShortcut(evt: KeyboardEvent) {
    if (evt.ctrlKey && evt.key === 'k') {
      evt.preventDefault();
      this.openSearchDialog();
    }
  }
}

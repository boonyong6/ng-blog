import { AsyncPipe, CommonModule, NgOptimizedImage } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { PostService } from './posts/data-access/post.service';
import { UrlHelper } from './posts/utils/url-helper';
import { LoadingService } from './shared/data-access/loading.service';
import { ThemeService } from './shared/data-access/theme.service';
import { ThemeMode } from './shared/data-access/types';
import { LoadingOverlayComponent } from './shared/ui/loading-overlay/loading-overlay.component';
import { SearchDialogService } from './shared/ui/search-dialog/search-dialog.service';
import {
  GetSearchResultParams,
  SearchResult,
  SearchResultItem,
} from './shared/ui/search-dialog/types';
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
export class AppComponent implements OnInit, AfterViewInit {
  socialLinks = siteMetadata.socialLinks;
  menuItems = siteMetadata.menuItems;
  ThemeMode = ThemeMode;
  @ViewChild(MatDrawer) drawer!: MatDrawer;

  constructor(
    public loadingService: LoadingService,
    public themeService: ThemeService,
    public searchDialogService: SearchDialogService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private destroyRef: DestroyRef,
    private postService: PostService,
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.drawer.close();
        }
      });
  }

  ngAfterViewInit() {
    // Subscribe to loading changes to trigger manual detection
    this.loadingService.isLoading$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.changeDetectorRef.detectChanges();
      });
  }

  openSearchDialog() {
    this.searchDialogService.open((params) => this.getSearchResult$(params));
  }

  private getSearchResult$(
    params: GetSearchResultParams,
  ): Observable<SearchResult> {
    const { searchQuery, url } = params;

    let postPage$ =
      searchQuery || url
        ? this.postService.searchPosts({ url, query: searchQuery })
        : this.postService.getPosts();

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

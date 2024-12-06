import { Component, Provider } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { firstValueFrom, of } from 'rxjs';
import { AppComponent } from './app.component';
import { PostService } from './posts/data-access/post.service';
import { Post } from './posts/data-access/types';
import { Page } from './shared/data-access/types';
import { SearchDialogService } from './shared/ui/search-dialog/search-dialog.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let postServiceSpy: jasmine.SpyObj<PostService>;
  let searchDialogServiceSpy: jasmine.SpyObj<SearchDialogService>;
  let routerTesting: RouterTestingHarness;
  let posts: Post[];

  beforeEach(async () => {
    posts = [{ id: 1, title: 'Post 1' } as Post];
    const _postServiceSpy = jasmine.createSpyObj<PostService>([
      'getPosts',
      'searchPosts',
    ]);
    _postServiceSpy.getPosts.and.returnValue(
      of({ results: posts } as Page<Post>),
    );
    _postServiceSpy.searchPosts.and.returnValue(
      of({ results: posts } as Page<Post>),
    );
    const _searchDialogServiceSpy = jasmine.createSpyObj<SearchDialogService>([
      'open',
    ]);

    await TestBed.configureTestingModule({
      imports: [AppComponent, BrowserAnimationsModule],
      providers: [
        provideRouter([{ path: '**', component: DummyComponent }]),
        { provide: PostService, useValue: _postServiceSpy } as Provider,
        {
          provide: SearchDialogService,
          useValue: _searchDialogServiceSpy,
        } as Provider,
      ],
    }).compileComponents();

    postServiceSpy = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
    searchDialogServiceSpy = TestBed.inject(
      SearchDialogService,
    ) as jasmine.SpyObj<SearchDialogService>;
    routerTesting = await RouterTestingHarness.create();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should open search dialog on search toolbar action clicked', () => {
    const elt: HTMLElement = fixture.nativeElement;
    const searchButton = elt.querySelector(
      '[data-testid="search-button"]',
    )! as HTMLButtonElement;

    searchButton.click();

    expect(searchDialogServiceSpy.open).toHaveBeenCalled();
  });

  it('should get posts on search dialog open', () => {
    const elt: HTMLElement = fixture.nativeElement;
    const searchButton = elt.querySelector(
      '[data-testid="search-button"]',
    )! as HTMLButtonElement;
    searchDialogServiceSpy.open.and.callFake((getSearchResult$) => {
      firstValueFrom(getSearchResult$({}));
    });

    searchButton.click();

    expect(postServiceSpy.getPosts).toHaveBeenCalled();
  });

  it('should search posts when search dialog invokes callback with search query', () => {
    const elt: HTMLElement = fixture.nativeElement;
    const searchButton = elt.querySelector(
      '[data-testid="search-button"]',
    )! as HTMLButtonElement;
    searchDialogServiceSpy.open.and.callFake((getSearchResult$) => {
      firstValueFrom(getSearchResult$({ searchQuery: 'angular' }));
    });

    searchButton.click();

    expect(postServiceSpy.searchPosts).toHaveBeenCalled();
  });

  it('should open search dialog via keyboard shortcut', () => {
    const elt: HTMLElement = fixture.nativeElement;
    spyOn(app, 'openSearchDialog');

    elt.ownerDocument.dispatchEvent(
      new KeyboardEvent('keydown', { ctrlKey: true, key: 'k' }),
    );

    expect(app.openSearchDialog).toHaveBeenCalled();
  });

  it('should close drawer upon route navigation', async () => {
    spyOn(app.drawer, 'close');

    await routerTesting.navigateByUrl('dummy');

    expect(app.drawer.close).toHaveBeenCalled();
  });
});

@Component({
  selector: 'app-dummy',
  template: '',
})
class DummyComponent {}

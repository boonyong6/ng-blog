import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';
import { Page, Tag } from '../../../shared/data-access/types';
import { PostService } from '../../data-access/post.service';
import { Post } from '../../data-access/types';
import { PostListComponent } from './post-list.component';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let postServiceSpy: jasmine.SpyObj<PostService>;
  let routerTesting: RouterTestingHarness;

  beforeEach(async () => {
    const _postServiceSpy = jasmine.createSpyObj<PostService>([
      'getPosts',
      'getTags',
    ]);
    _postServiceSpy.getPosts.and.returnValue(
      of({ count: 60, pageSize: 10 } as Page<Post>),
    );
    _postServiceSpy.getTags.and.returnValue(
      of({
        count: 1,
        pageSize: 10,
        previous: null,
        next: 'https://example.com/?page=2',
        results: [{ id: 1, name: 'angular' } as Tag],
      } satisfies Page<Tag>),
    );

    await TestBed.configureTestingModule({
      imports: [PostListComponent],
      providers: [
        provideRouter([
          { path: 'tags/:tagSlug/page/:pageNum', component: PostListComponent },
        ]),
        { provide: PostService, useValue: _postServiceSpy },
      ],
    }).compileComponents();

    postServiceSpy = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
    routerTesting = await RouterTestingHarness.create();

    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct previous and next page URL', async () => {
    const routedComponent = await routerTesting.navigateByUrl(
      'tags/angular/page/1',
      PostListComponent,
    );

    expect(routedComponent.prevPageUrl).toContain('tags/angular/page');
    expect(routedComponent.nextPageUrl).toContain('tags/angular/page');
  });

  it('should have correct total page', () => {
    const elt: HTMLElement = fixture.nativeElement;
    const spanElt: HTMLSpanElement = elt.querySelector(
      '[data-testid="total-page"]',
    )!;

    expect(spanElt.textContent).toBe('6');
  });

  it('#loadMoreTags should expectation', () => {
    component.loadMoreTags();

    expect(component.tagPaginator.data.length).toBe(2);
  });
});

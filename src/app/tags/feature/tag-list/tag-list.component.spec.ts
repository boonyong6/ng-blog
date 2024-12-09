import { Provider } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { PostService } from '../../../posts/data-access/post.service';
import { Page, Tag } from '../../../shared/data-access/types';
import { TagListComponent } from './tag-list.component';

describe('TagListComponent', () => {
  let component: TagListComponent;
  let fixture: ComponentFixture<TagListComponent>;
  let postServiceSpy: jasmine.SpyObj<PostService>;

  beforeEach(async () => {
    const _postServiceSpy = jasmine.createSpyObj<PostService>(['getTags']);
    await TestBed.configureTestingModule({
      imports: [TagListComponent],
      providers: [
        provideRouter([]),
        { provide: PostService, useValue: _postServiceSpy } as Provider,
      ],
    }).compileComponents();

    postServiceSpy = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
    postServiceSpy.getTags.and.returnValue(
      of({
        count: 1,
        pageSize: 10,
        previous: null,
        next: 'https://example.com/?page=2',
        results: [{ id: 1, name: 'angular' } as Tag],
      } satisfies Page<Tag>),
    );

    fixture = TestBed.createComponent(TagListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load more tags on "More" button clicked', () => {
    const elt: HTMLElement = fixture.nativeElement;
    const tag = { id: 1, name: 'python' } as Tag;
    postServiceSpy.getTags.and.returnValue(
      of({
        count: 2,
        pageSize: 10,
        previous: null,
        next: null,
        results: [tag],
      } satisfies Page<Tag>),
    );

    elt.querySelector('button')?.click();

    expect(component.paginator.data.length).toBe(2);
  });
});

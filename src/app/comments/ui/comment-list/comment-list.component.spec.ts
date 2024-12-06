import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { Page } from '../../../shared/data-access/types';
import { CommentService } from '../../data-access/comment.service';
import { Comment } from '../../data-access/types';
import { CommentListComponent } from './comment-list.component';

describe('CommentListComponent', () => {
  let component: CommentListComponent;
  let fixture: ComponentFixture<CommentListComponent>;
  let commentServiceSpy: jasmine.SpyObj<CommentService>;
  let store: MockStore;

  beforeEach(async () => {
    const _commentServiceSpy = jasmine.createSpyObj<CommentService>([
      'getComments',
    ]);
    const initialState = {};

    await TestBed.configureTestingModule({
      imports: [CommentListComponent],
      providers: [
        { provide: CommentService, useValue: _commentServiceSpy },
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    commentServiceSpy = TestBed.inject(
      CommentService,
    ) as jasmine.SpyObj<CommentService>;
    store = TestBed.inject(MockStore);

    commentServiceSpy.getComments.and.returnValue(
      of({
        count: 1,
        pageSize: 10,
        previous: null,
        next: 'https://example.com/?page=2',
        results: [{ id: 1, postId: 1, body: 'First comment' } as Comment],
      } satisfies Page<Comment>),
    );

    fixture = TestBed.createComponent(CommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#addComment should increment comment counts', () => {
    const comment = {
      id: 2,
      postId: 2,
      body: 'Second comment',
    } as Comment;
    spyOn(component.paginator, 'hasNext').and.returnValue(false);

    component.addComment(comment);

    expect(component.paginator.count).toBe(2);
    const comments = component.paginator.data;
    expect(comments[comments.length - 1]).toBe(comment);
  });

  it('should load more comments on "More" button clicked', () => {
    const elt: HTMLElement = fixture.nativeElement;
    const comment = {
      id: 3,
      postId: 3,
      body: 'Comment from next page',
    } as Comment;
    commentServiceSpy.getComments.and.returnValue(
      of({
        count: 2,
        pageSize: 10,
        previous: null,
        next: null,
        results: [comment],
      } satisfies Page<Comment>),
    );

    elt.querySelector('button')?.click();

    expect(component.paginator.data.length).toBe(2);
  });
});

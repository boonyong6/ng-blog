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

    commentServiceSpy.getComments.and.returnValue(of({} as Page<Comment>));

    fixture = TestBed.createComponent(CommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

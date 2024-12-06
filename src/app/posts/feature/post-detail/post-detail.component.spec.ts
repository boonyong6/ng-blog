import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  Provider,
  Type,
} from '@angular/core';
import {
  ComponentFixture,
  DeferBlockState,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { of } from 'rxjs';
import { CommentService } from '../../../comments/data-access/comment.service';
import { Comment } from '../../../comments/data-access/types';
import { CommentFormComponent } from '../../../comments/ui/comment-form/comment-form.component';
import { CommentListComponent } from '../../../comments/ui/comment-list/comment-list.component';
import { Page } from '../../../shared/data-access/types';
import { WINDOW } from '../../../shared/utils/injection-tokens';
import { PostService } from '../../data-access/post.service';
import { Post } from '../../data-access/types';
import { PostDetailComponent } from './post-detail.component';

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;
  let postServiceSpy: jasmine.SpyObj<PostService>;
  let windowSpy: jasmine.SpyObj<Window & typeof globalThis>;
  let post: Post;
  let comments: Comment[];

  beforeEach(async () => {
    const activatedRouteMock = {
      params: of({}),
      fragment: of(null),
    } as ActivatedRoute;

    post = { id: 1, title: 'Post 1' } as Post;
    const _postServiceSpy = jasmine.createSpyObj<PostService>([
      'getPost',
      'getSimilarPosts',
    ]);
    _postServiceSpy.getPost.and.returnValue(of(post));
    _postServiceSpy.getSimilarPosts.and.returnValue(of({} as Page<Post>));

    comments = [{ id: 1, body: 'Some comment' } as Comment];
    const _commentServiceSpy = jasmine.createSpyObj<CommentService>([
      'getComments',
      'createComment',
    ]);
    _commentServiceSpy.getComments.and.returnValue(
      of({ results: comments } as Page<Comment>),
    );

    await TestBed.configureTestingModule({
      imports: [PostDetailComponent, BrowserAnimationsModule],
      providers: [
        { provide: PostService, useValue: _postServiceSpy } as Provider,
        { provide: CommentService, useValue: _commentServiceSpy } as Provider,
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock as ActivatedRoute,
        } as Provider,
        { provide: WINDOW, useValue: window } as Provider,
      ],
    })
      .overrideComponent(PostDetailComponent, {
        remove: {
          imports: [
            MarkdownComponent,
            CommentListComponent,
            CommentFormComponent,
          ],
        },
        add: {
          imports: [
            MarkdownStubComponent,
            CommentListStubComponent,
            CommentFormStubComponent,
          ],
        },
      })
      .compileComponents();

    postServiceSpy = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
    windowSpy = TestBed.inject(WINDOW) as jasmine.SpyObj<
      Window & typeof globalThis
    >;

    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have "scroll to top" button when start scrolling', fakeAsync(() => {
    const elt: HTMLElement = fixture.nativeElement;

    windowSpy.scrollY = 10;
    windowSpy.dispatchEvent(new Event('scroll'));
    tick(300);
    fixture.detectChanges();

    const scrollToTopButtonElt = elt.querySelector(
      '[data-testid="scroll-to-top-button"]',
    );
    expect(scrollToTopButtonElt).toBeTruthy();
    expect(component.isScrolling).toBe(true);
  }));

  it('should have no "scroll to top" button when scrolled to top', fakeAsync(() => {
    const elt: HTMLElement = fixture.nativeElement;

    windowSpy.scrollY = 0;
    windowSpy.dispatchEvent(new Event('scroll'));
    tick(300);
    fixture.detectChanges();

    const scrollToTopButtonElt = elt.querySelector(
      '[data-testid="scroll-to-top-button"]',
    );
    expect(scrollToTopButtonElt).toBeFalsy();
    expect(component.isScrolling).toBe(false);
  }));

  it('#method should expectation', async () => {
    // * Arrange
    // Render defer block (comment list component).
    const commentListDeferBlock = (await fixture.getDeferBlocks())[0];
    await commentListDeferBlock.render(DeferBlockState.Complete);
    // Get comment list component (stub) from fixture.
    const commentListStubDe = fixture.debugElement.query(
      By.directive(CommentListStubComponent),
    );
    const commentListStub =
      commentListStubDe.componentInstance as CommentListStubComponent;
    // Replace comment list component ref with stub.
    component.commentList = commentListStub as unknown as CommentListComponent;
    // Get comment form component (stub) from fixture.
    const commentFormStubDe = fixture.debugElement.query(
      By.directive(CommentFormStubComponent),
    );
    const commentFormStub =
      commentFormStubDe.componentInstance as CommentFormStubComponent;

    // * Act
    commentFormStub.addComment();

    // * Assert
    expect(commentListStub.commentAdded).toBe(true);
  });
});

@Component({ selector: 'markdown', template: '' })
class MarkdownStubComponent implements AfterViewInit {
  @Input() clipboardButtonComponent: Type<unknown> | undefined;
  @Input() data: string | null | undefined;
  @Input() disableSanitizer: boolean = false;
  @Output() ready = new EventEmitter<void>();

  ngAfterViewInit(): void {
    this.ready.emit();
  }
}

@Component({ selector: 'app-comment-list', template: '' })
class CommentListStubComponent {
  @Input() postId!: number;
  commentAdded = false;

  addComment() {
    this.commentAdded = true;
  }
}

@Component({ selector: 'app-comment-form', template: '' })
class CommentFormStubComponent {
  @Input() postId!: number;
  @Output() commentCreated = new EventEmitter<Comment>();

  addComment() {
    this.commentCreated.emit();
  }
}

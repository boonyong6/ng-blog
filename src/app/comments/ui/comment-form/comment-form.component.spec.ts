import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CommentService } from '../../data-access/comment.service';
import { Comment } from '../../data-access/types';
import { CommentFormComponent } from './comment-form.component';

describe('CommentFormComponent', () => {
  let component: CommentFormComponent;
  let fixture: ComponentFixture<CommentFormComponent>;
  let commentServiceSpy: jasmine.SpyObj<CommentService>;

  beforeEach(async () => {
    const _commentServiceSpy = jasmine.createSpyObj<CommentService>([
      'createComment',
    ]);

    await TestBed.configureTestingModule({
      imports: [CommentFormComponent, BrowserAnimationsModule],
      providers: [{ provide: CommentService, useValue: _commentServiceSpy }],
    }).compileComponents();

    commentServiceSpy = TestBed.inject(
      CommentService,
    ) as jasmine.SpyObj<CommentService>;

    fixture = TestBed.createComponent(CommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#addComment should return early when from is invalid', () => {
    const elt: HTMLElement = fixture.nativeElement;
    const buttonElt: HTMLButtonElement = elt.querySelector('button')!;

    buttonElt.disabled = false;
    buttonElt.click();

    expect(commentServiceSpy.createComment).toHaveBeenCalledTimes(0);
  });

  it('#addComment should create comment when form is valid', () => {
    const elt: HTMLElement = fixture.nativeElement;
    const buttonElt: HTMLButtonElement = elt.querySelector('button')!;
    const comment = 'Some comment';
    const bodyElt: HTMLTextAreaElement = elt.querySelector(
      '[formControlName="body"]',
    )!;
    bodyElt.value = comment;
    bodyElt.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    component.postId = 6;
    commentServiceSpy.createComment.and.returnValue(of({} as Comment));

    buttonElt.click();

    expect(commentServiceSpy.createComment).toHaveBeenCalledWith({
      name: '',
      body: comment,
      postId: component.postId,
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommentService } from '../../data-access/comment.service';
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
});

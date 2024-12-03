import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { PostService } from '../../data-access/post.service';
import { PostDetailComponent } from './post-detail.component';

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;
  let postServiceSpy: jasmine.SpyObj<PostService>;
  const activatedRouteMock = {
    params: of({}),
    fragment: of(null),
  } as ActivatedRoute;

  beforeEach(async () => {
    const _postServiceSpy = jasmine.createSpyObj<PostService>([
      'getPost',
      'getSimilarPosts',
    ]);

    await TestBed.configureTestingModule({
      imports: [PostDetailComponent],
      providers: [
        { provide: PostService, useValue: _postServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock as ActivatedRoute,
        },
      ],
    }).compileComponents();

    postServiceSpy = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;

    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { PostService } from '../../data-access/post.service';
import { PostListComponent } from './post-list.component';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let postServiceSpy: jasmine.SpyObj<PostService>;
  const activatedRouteMock = {
    params: of({}),
  } as ActivatedRoute;

  beforeEach(async () => {
    const _postServiceSpy = jasmine.createSpyObj<PostService>([
      'getPosts',
      'getTags',
    ]);

    await TestBed.configureTestingModule({
      imports: [PostListComponent],
      providers: [
        { provide: PostService, useValue: _postServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    postServiceSpy = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
    // Must be mocked before `TestBed.createComponent`, since `getTags()` will be invoked during the component init.
    postServiceSpy.getTags.and.returnValue(of());

    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

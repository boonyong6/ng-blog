import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from './app.component';
import { PostService } from './posts/data-access/post.service';

describe('AppComponent', () => {
  let postServiceSpy: jasmine.SpyObj<PostService>;

  beforeEach(async () => {
    const _postServiceSpy = jasmine.createSpyObj<PostService>([
      'searchPosts',
      'getPosts',
    ]);

    await TestBed.configureTestingModule({
      imports: [AppComponent, BrowserAnimationsModule],
      providers: [
        { provide: PostService, useValue: _postServiceSpy },
        { provide: ActivatedRoute, useValue: {} as ActivatedRoute },
      ],
    }).compileComponents();

    postServiceSpy = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostService } from '../../posts/data-access/post.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let postServiceSpy: jasmine.SpyObj<PostService>;

  beforeEach(async () => {
    const _postServiceSpy = jasmine.createSpyObj<PostService>([
      'getLatestPosts',
    ]);

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{ provide: PostService, useValue: _postServiceSpy }],
    }).compileComponents();

    postServiceSpy = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

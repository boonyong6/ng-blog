import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Post } from '../../data-access/types';
import { PostListItemComponent } from './post-list-item.component';

describe('PostListItemComponent', () => {
  let component: PostListItemComponent;
  let fixture: ComponentFixture<PostListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostListItemComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PostListItemComponent);
    component = fixture.componentInstance;
    component.post = {} as Post;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

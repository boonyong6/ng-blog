import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PostService } from '../../../posts/data-access/post.service';
import { TagListComponent } from './tag-list.component';

describe('TagListComponent', () => {
  let component: TagListComponent;
  let fixture: ComponentFixture<TagListComponent>;
  let postServiceSpy: jasmine.SpyObj<PostService>;

  beforeEach(async () => {
    const _postServiceSpy = jasmine.createSpyObj<PostService>(['getTags']);
    await TestBed.configureTestingModule({
      imports: [TagListComponent],
      providers: [{ provide: PostService, useValue: _postServiceSpy }],
    }).compileComponents();

    postServiceSpy = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
    postServiceSpy.getTags.and.returnValue(of());

    fixture = TestBed.createComponent(TagListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TagLinkComponent } from './tag-link.component';

describe('TagLinkComponent', () => {
  let component: TagLinkComponent;
  let fixture: ComponentFixture<TagLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagLinkComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TagLinkComponent);
    component = fixture.componentInstance;
    component.tagName = '';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

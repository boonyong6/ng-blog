import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagSidenavComponent } from './tag-sidenav.component';

describe('TagSidenavComponent', () => {
  let component: TagSidenavComponent;
  let fixture: ComponentFixture<TagSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagSidenavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

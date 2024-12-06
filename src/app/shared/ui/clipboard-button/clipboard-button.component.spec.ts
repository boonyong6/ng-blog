import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { ClipboardButtonComponent } from './clipboard-button.component';

describe('ClipboardButtonComponent', () => {
  let component: ClipboardButtonComponent;
  let fixture: ComponentFixture<ClipboardButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClipboardButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClipboardButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set is copied state to true when it is clicked and before timeout', () => {
    const elt: HTMLElement = fixture.nativeElement;

    elt.querySelector('button')?.click();
    fixture.detectChanges();

    expect(elt.querySelector('mat-icon')?.textContent).toBe('check');
  });

  it('should set is copied state to false after timeout', fakeAsync(() => {
    const elt: HTMLElement = fixture.nativeElement;

    elt.querySelector('button')?.click();
    tick(2000);
    fixture.detectChanges();

    expect(elt.querySelector('mat-icon')?.textContent).toBe('content_copy');
  }));
});

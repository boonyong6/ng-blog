import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { AutoScrollService } from '../services/auto-scroll.service';
import { RestoreScrollPositionDirective } from './restore-scroll-position.directive';

describe('RestoreScrollPositionDirective', () => {
  let autoScrollServiceSpy: jasmine.SpyObj<AutoScrollService>;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    const _autoScrollServiceSpy = jasmine.createSpyObj<AutoScrollService>([
      'shouldScroll',
    ]);
    _autoScrollServiceSpy.shouldScroll = jasmine.createSpyObj<
      BehaviorSubject<boolean>
    >(['next']);

    TestBed.configureTestingModule({
      providers: [
        RestoreScrollPositionDirective,
        TestComponent,
        { provide: AutoScrollService, useValue: _autoScrollServiceSpy },
      ],
    });

    autoScrollServiceSpy = TestBed.inject(AutoScrollService);

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new RestoreScrollPositionDirective(autoScrollServiceSpy);
    expect(directive).toBeTruthy();
  });

  it('should emit scroll restore event after view init', () => {
    expect(autoScrollServiceSpy.shouldScroll.next).toHaveBeenCalledWith(true);
  });
});

@Component({
  imports: [RestoreScrollPositionDirective],
  template: `<span appRestoreScrollPosition></span>`,
})
class TestComponent {}

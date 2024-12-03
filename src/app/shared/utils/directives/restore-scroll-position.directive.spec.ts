import { TestBed } from '@angular/core/testing';
import { AutoScrollService } from '../services/auto-scroll.service';
import { RestoreScrollPositionDirective } from './restore-scroll-position.directive';

describe('RestoreScrollingDirective', () => {
  let autoScrollServiceSpy: jasmine.SpyObj<AutoScrollService>;

  beforeEach(() => {
    const _autoScrollServiceSpy = jasmine.createSpyObj<AutoScrollService>([
      'shouldScroll',
    ]);

    TestBed.configureTestingModule({
      providers: [
        { provide: AutoScrollService, useValue: _autoScrollServiceSpy },
      ],
    });

    autoScrollServiceSpy = TestBed.inject(AutoScrollService);
  });

  it('should create an instance', () => {
    const directive = new RestoreScrollPositionDirective(autoScrollServiceSpy);
    expect(directive).toBeTruthy();
  });
});

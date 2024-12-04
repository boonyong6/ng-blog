import { ViewportScroller } from '@angular/common';
import { Provider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NavigationEnd, Router, Scroll } from '@angular/router';
import { Observable } from 'rxjs';
import { AutoScrollService } from './auto-scroll.service';

describe('AutoScrollService', () => {
  let service: AutoScrollService;
  let viewportScrollerSpy: jasmine.SpyObj<ViewportScroller>;

  beforeEach(() => {
    const _viewportScrollerSpy = jasmine.createSpyObj<ViewportScroller>([
      'scrollToPosition',
    ]);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useClass: MockRouter } as Provider,
        {
          provide: ViewportScroller,
          useValue: _viewportScrollerSpy,
        } as Provider,
      ],
    });
    service = TestBed.inject(AutoScrollService);
    viewportScrollerSpy = TestBed.inject(
      ViewportScroller,
    ) as jasmine.SpyObj<ViewportScroller>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#shouldScroll should restore scrolling when it is true', () => {
    service.shouldScroll.next(true);

    expect(viewportScrollerSpy.scrollToPosition).toHaveBeenCalled();
  });
});

class MockRouter {
  private scrollEvent = new Scroll(new NavigationEnd(0, '', ''), null, null);
  events = new Observable((observer) => {
    observer.next(this.scrollEvent);
    observer.complete();
  });
}

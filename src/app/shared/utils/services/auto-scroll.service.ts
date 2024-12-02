import { ViewportScroller } from '@angular/common';
import { DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, Scroll } from '@angular/router';
import { BehaviorSubject, filter, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutoScrollService {
  shouldScroll = new BehaviorSubject<boolean>(false);
  private shouldScroll$ = this.shouldScroll.asObservable();

  constructor(
    router: Router,
    viewportScroller: ViewportScroller,
    destroyRef: DestroyRef,
  ) {
    const position$ = router.events.pipe(
      filter((evt) => evt instanceof Scroll),
      map((scrollEvt) => scrollEvt.position),
    );

    position$
      .pipe(
        switchMap((position) => {
          return this.shouldScroll$.pipe(
            filter(Boolean),
            map(() => position),
          );
        }),
        takeUntilDestroyed(destroyRef),
      )
      .subscribe((position) => {
        viewportScroller.scrollToPosition(position || [0, 0]);
      });
  }
}

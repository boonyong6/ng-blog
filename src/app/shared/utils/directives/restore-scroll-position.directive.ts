import { AfterViewInit, Directive } from '@angular/core';
import { AutoScrollService } from '../services/auto-scroll.service';

@Directive({
  selector: '[appRestoreScrollPosition]',
})
export class RestoreScrollPositionDirective implements AfterViewInit {
  constructor(private autoScrollService: AutoScrollService) {}

  ngAfterViewInit(): void {
    this.autoScrollService.shouldScroll.next(true);
  }
}

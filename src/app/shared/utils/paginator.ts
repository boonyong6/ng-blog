import { Observable, Subject, takeUntil } from 'rxjs';
import { Page } from '../data-access/types';

export class Paginator<T> {
  private nextUrl: string | null = null;
  private destroy$ = new Subject<void>();

  readonly data: T[] = [];
  count = 0;

  constructor(page$: Observable<Page<T>>) {
    this.loadData(page$);
  }

  loadNext(callback: (nextUrl: string) => Observable<Page<T>>) {
    if (!this.nextUrl) {
      return;
    }

    this.loadData(callback(this.nextUrl));
  }

  hasNext() {
    return this.nextUrl ? true : false;
  }

  destroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadData(page$: Observable<Page<T>>): void {
    page$.pipe(takeUntil(this.destroy$)).subscribe((page) => {
      this.data.push(...page.results);
      this.nextUrl = page.next;
      this.count = page.count;
    });
  }
}

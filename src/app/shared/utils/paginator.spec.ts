import { of } from 'rxjs';
import { Page } from '../data-access/types';
import { Paginator } from './paginator';

describe('Paginator', () => {
  let paginator: Paginator<string>;

  beforeEach(() => {
    paginator = new Paginator(
      of({
        next: 'https://example.com/?page=2',
        results: ['a', 'b', 'c'],
      } as Page<string>),
    );
  });

  it('should be created', () => {
    expect(paginator).toBeTruthy();
  });

  it('#loadNext should load next page of data', () => {
    paginator.loadNext(() =>
      of({
        results: ['d', 'e', 'f'],
      } as Page<string>),
    );

    expect(paginator.data).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
  });

  it('#loadNext should return early when no next page', () => {
    paginator.loadNext(() =>
      of({ results: ['d'] as string[], next: null } as Page<string>),
    );
    paginator.loadNext(() => of()); // Previous `loadNext()` indicates no next page, hence return early.

    expect(paginator.data).toEqual(['a', 'b', 'c', 'd']);
  });
});

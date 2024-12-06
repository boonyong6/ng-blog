import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { SearchDialogComponent } from './search-dialog.component';
import { SearchResult, SearchResultItem } from './types';

describe('SearchDialogComponent', () => {
  let component: SearchDialogComponent;
  let fixture: ComponentFixture<SearchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchDialogComponent],
      providers: [{ provide: ActivatedRoute, useValue: {} as ActivatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search input changed event.', fakeAsync(() => {
    const elt: HTMLElement = fixture.nativeElement;
    const searchInputElt: HTMLInputElement = elt.querySelector('input')!;
    component.searchInputChanged = jasmine.createSpyObj<EventEmitter<string>>([
      'emit',
    ]);
    const searchQuery = 'angular';

    searchInputElt.value = searchQuery;
    searchInputElt.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(500);

    expect(component.searchInputChanged.emit).toHaveBeenCalledWith(searchQuery);
  }));

  it('#appendSearchResult should load search result', () => {
    const items: SearchResultItem[] = [
      {
        date: '2024-12-05T09:21:21.988Z',
        title: 'Post 1',
        url: 'https://example.com/post-1/',
      },
      {
        date: '2024-12-05T09:21:21.988Z',
        title: 'Post 2',
        url: 'https://example.com/post-2/',
      },
    ];
    const result: SearchResult = {
      items,
      next: 'https://example.com/?page=2',
    };

    component.appendSearchResult(of(result));
    fixture.detectChanges();

    expect(component.searchResult.items).toEqual(items);
    expect(component.isLoaded).toEqual(true);
  });

  it('#appendSearchResult should load search result', () => {
    component.appendSearchResult(throwError(() => new Error()));
    fixture.detectChanges();

    expect(component.isLoaded).toEqual(true);
  });
});

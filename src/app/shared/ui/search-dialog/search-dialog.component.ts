import {
  afterRender,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { debounceTime, Observable } from 'rxjs';
import { SearchResult } from './types';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-dialog',
  imports: [
    DatePipe,
    RouterLink,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
  ],
  templateUrl: './search-dialog.component.html',
  styleUrl: './search-dialog.component.css',
})
export class SearchDialogComponent implements OnInit {
  searchResult: SearchResult = { items: [], next: null };
  // Using `LoadingService` causes UI flickering due to its global loading state tracking.
  isLoaded = false;
  searchInput = new FormControl('');
  @Output() searchInputChanged = new EventEmitter<string>();
  @Output() nextPageTriggered = new EventEmitter<string>();

  @ViewChild('dialogContainer') dialogContainerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('skeletonLoader') skeletonLoaderRef?: ElementRef<HTMLLIElement>;
  intersectionObserver?: IntersectionObserver;
  isIntersectionObserverSet = false;

  constructor(private destroyRef: DestroyRef) {
    afterRender(() => {
      this.setupIntersectionObserver();
    });

    destroyRef.onDestroy(() => {
      this.resetSearch();
    });
  }

  private setupIntersectionObserver() {
    if (!this.skeletonLoaderRef || this.isIntersectionObserverSet) {
      return;
    }

    this.intersectionObserver = new IntersectionObserver(
      this.onIntersection(),
      {
        root: this.dialogContainerRef.nativeElement,
      },
    );
    this.intersectionObserver.observe(this.skeletonLoaderRef.nativeElement);
    this.isIntersectionObserverSet = true;
  }

  private onIntersection(): IntersectionObserverCallback {
    return (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.resetIntersectionObserver();
          this.nextPageTriggered.emit(this.searchResult.next!);
        }
      });
    };
  }

  private resetIntersectionObserver() {
    this.intersectionObserver?.disconnect();
    this.isIntersectionObserverSet = false;
  }

  ngOnInit(): void {
    this.searchInput.valueChanges
      .pipe(debounceTime(500))
      .subscribe((searchQuery) => {
        this.resetSearch();
        this.searchInputChanged.emit(searchQuery ?? '');
      });
  }

  appendSearchResult(searchResult$: Observable<SearchResult>) {
    this.isLoaded = false;

    searchResult$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (response) => {
        this.searchResult.next = response.next;
        this.searchResult.items.push(...response.items);
        this.isLoaded = true;
      },
      error: (err) => {
        console.error('Error loading search result:', err);
        this.isLoaded = true;
      },
    });
  }

  private resetSearch() {
    this.searchResult.items = [];
    this.searchResult.next = null;
    this.resetIntersectionObserver();
  }
}

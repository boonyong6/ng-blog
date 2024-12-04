import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { SearchDialogComponent } from './search-dialog.component';
import { GetSearchResultParams, SearchResult } from './types';

@Injectable({
  providedIn: 'root',
})
export class SearchDialogService {
  isOpened = false;

  constructor(private dialogService: MatDialog) {}

  open(
    getSearchResult$: (
      params: GetSearchResultParams,
    ) => Observable<SearchResult>,
  ): void {
    if (this.isOpened) {
      return;
    }

    const dialogRef = this.dialogService.open(SearchDialogComponent);
    this.isOpened = true;

    const dialogComponent = dialogRef.componentInstance;
    dialogComponent.appendSearchResult(getSearchResult$({}));

    dialogComponent.searchInputChanged.subscribe((searchQuery: string) => {
      dialogComponent.appendSearchResult(getSearchResult$({ searchQuery }));
    });

    dialogComponent.nextPageTriggered.subscribe((nextUrl) => {
      dialogComponent.appendSearchResult(getSearchResult$({ url: nextUrl }));
    });

    dialogRef.beforeClosed().subscribe(() => {
      this.isOpened = false;
    });
  }
}

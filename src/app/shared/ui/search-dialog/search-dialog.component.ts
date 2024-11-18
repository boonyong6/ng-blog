import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { debounceTime, Observable } from 'rxjs';
import { SearchResult } from './types';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-dialog',
  standalone: true,
  imports: [
    AsyncPipe,
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
  searchInput = new FormControl('');
  @Output() searchInputChange = new EventEmitter<string>();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { searchResults$: Observable<SearchResult[]> }
  ) {}

  ngOnInit(): void {
    this.searchInput.valueChanges
      .pipe(debounceTime(300))
      .subscribe((searchQuery) => {
        this.searchInputChange.emit(searchQuery ?? '');
      });
  }
}

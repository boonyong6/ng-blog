import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { SearchResult } from './types';

@Component({
  selector: 'app-search-dialog',
  standalone: true,
  imports: [AsyncPipe, DatePipe, RouterLink, MatDialogModule, MatIconModule],
  templateUrl: './search-dialog.component.html',
  styleUrl: './search-dialog.component.css',
})
export class SearchDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { searchResults$: Observable<SearchResult[]> }
  ) {}
}

import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading-overlay',
  imports: [AsyncPipe, MatProgressSpinnerModule],
  templateUrl: './loading-overlay.component.html',
  styleUrl: './loading-overlay.component.css',
})
export class LoadingOverlayComponent {
  show$: Observable<boolean>;

  constructor(store: Store<{ showLoadingOverlay: boolean }>) {
    this.show$ = store.select('showLoadingOverlay');
  }
}

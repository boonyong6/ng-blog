import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadingOverlayFeature } from '../../data-access/loading-overlay.reducer';

@Component({
  selector: 'app-loading-overlay',
  imports: [AsyncPipe, MatProgressSpinnerModule],
  templateUrl: './loading-overlay.component.html',
  styleUrl: './loading-overlay.component.css',
})
export class LoadingOverlayComponent {
  enable$: Observable<boolean>;

  constructor(store: Store) {
    this.enable$ = store.select(loadingOverlayFeature.selectEnable);
  }
}

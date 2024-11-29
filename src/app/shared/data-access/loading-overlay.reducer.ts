import { createReducer, on } from '@ngrx/store';
import { enable, disable } from './loading-overlay.actions';

export const showLoadingOverlay = true;

export const loadingOverlayReducer = createReducer(
  showLoadingOverlay,
  on(enable, () => true),
  on(disable, () => false),
);

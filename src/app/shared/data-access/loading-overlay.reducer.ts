import { createFeature, createReducer, on } from '@ngrx/store';
import { CommentListActions } from '../../comments/data-access/comment-list.actions';

export interface State {
  enable: boolean;
}

export const initialState: State = {
  enable: true,
};

export const loadingOverlayFeature = createFeature({
  name: 'loadingOverlay',
  reducer: createReducer(
    initialState,
    on(CommentListActions.load, (state) => ({ ...state, enable: false })),
    on(CommentListActions.loaded, (state) => ({ ...state, enable: true })),
  ),
});

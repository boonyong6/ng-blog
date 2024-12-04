import { CommentListActions } from '../../comments/data-access/comment-list.actions';
import * as fromReducer from './loading-overlay.reducer';

const { reducer } = fromReducer.loadingOverlayFeature;

describe('LoadingOverlay Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('load comment list action', () => {
    it('should disable loading overlay', () => {
      const { initialState } = fromReducer;
      const newState: fromReducer.State = {
        enable: false,
      };

      const action = CommentListActions.load();
      const state = fromReducer.loadingOverlayFeature.reducer(
        initialState,
        action,
      );

      expect(state).toEqual(newState);
      expect(state).not.toBe(initialState);
    });
  });

  describe('comment list loaded action', () => {
    it('should enable loading overlay', () => {
      const { initialState } = fromReducer;
      const newState: fromReducer.State = {
        enable: true,
      };

      const action = CommentListActions.loaded();
      const state = fromReducer.loadingOverlayFeature.reducer(
        initialState,
        action,
      );

      expect(state).toEqual(newState);
      expect(state).not.toBe(initialState);
    });
  });
});

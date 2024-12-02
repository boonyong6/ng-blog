import { initialState, loadingOverlayFeature } from './loading-overlay.reducer';

const { reducer } = loadingOverlayFeature;

describe('LoadingOverlay Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});

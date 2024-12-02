import { createActionGroup, emptyProps } from '@ngrx/store';

export const CommentListActions = createActionGroup({
  source: 'Comment List',
  events: {
    Load: emptyProps(),
    Loaded: emptyProps(),
  },
});

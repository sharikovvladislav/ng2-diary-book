import * as tagsActions from '../actions/tags';
import { Tag } from 'ng2-diary-book-shared-models';

export interface State {
  tags: Tag[];
  areTagsLoading: boolean;
}

export const initialState: State = {
  tags: [],
  areTagsLoading: false,
};

export function reducer(
  state = initialState,
  action: tagsActions.Actions,
): State {
  switch (action.type) {
    case tagsActions.GET_TAGS_LIST: {
      return {
        ...state,
        isTagsLoading: true,
      };
    }
    case tagsActions.GET_TAGS_LIST_SUCCESS: {
      return {
        ...state,
        tags: action.payload,
      };
    }
    case tagsActions.GET_TAGS_LIST_SUCCESS:
    case tagsActions.GET_TAGS_LIST_FAILURE: {
      return {
        ...state,
        isTagsLoading: false,
      };
    }
    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getTags = (state: State) => state.tags;
export const getTagsAreLoading = (state: State) => state.areTagsLoading;

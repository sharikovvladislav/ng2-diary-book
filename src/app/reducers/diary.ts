import { createSelector } from 'reselect';
import { Book } from '../models/book';
import * as diaryEntries from '../actions/diary-entries';


export interface State {
  entries: object[];
};

export const initialState: State = {
  entries: []
};

export function reducer(state = initialState, action: diaryEntries.Actions ): State {
  switch (action.type) {
    case diaryEntries.LOAD_LIST_SUCCESS: {
      return {
        ...state,
        entries: action.payload
      };
    }

    case diaryEntries.CREATE_ENTRY_SUCCESS: {
      return {
        ...state,
        entries: [...state.entries, action.payload]
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

export const getEntries = (state: State) => state.entries;

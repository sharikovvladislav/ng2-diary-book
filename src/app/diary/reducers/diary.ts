import * as diaryEntries from '../actions/diary-entries';
import * as user from '../../core/actions/user';
import { DiaryEntry } from 'ng2-diary-book-shared-models';
import * as moment from 'moment';

export interface State {
  entries: DiaryEntry[];
  diaryToEdit: DiaryEntry;
}

export const initialState: State = {
  entries: [],
  diaryToEdit: null,
};

export function reducer(
  state = initialState,
  action: diaryEntries.Actions | user.Actions,
): State {
  switch (action.type) {
    case diaryEntries.GET_EDIT_ENTRY_SUCCESS: {
      return {
        ...state,
        diaryToEdit: action.payload,
      };
    }
    case diaryEntries.GET_EDIT_ENTRY_CLEAR: {
      return {
        ...state,
        diaryToEdit: null,
      };
    }
    case user.UNLOAD_USER_DATA: {
      return {
        ...state,
        entries: [],
      };
    }

    case diaryEntries.LOAD_LIST_SUCCESS: {
      const entries = action.payload.map(entry => ({
        ...entry,
        $key: entry.$key,
        createDate: moment(entry.createDate).toDate(),
        date: moment(entry.date).toDate(),
      }));

      return {
        ...state,
        entries: entries.map(kek => ({ tags: [], ...kek })),
      };
    }

    case diaryEntries.EDIT_ENTRY_SUCCESS: {
      const itemKey = action.payload.$key;
      const updatedEntries = state.entries.map(
        entry =>
          entry.$key === itemKey ? { ...action.payload, $key: itemKey } : entry,
      );

      return {
        ...state,
        entries: updatedEntries,
      };
    }

    case diaryEntries.CREATE_ENTRY_SUCCESS: {
      return {
        ...state,
        entries: [action.payload, ...state.entries],
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
export const getDiaryToEditEntry = (state: State) => state.diaryToEdit;
export const getEntryByKey = (state: State, key) => {
  debugger;
  const entries = getEntries(state);
  let entry;

  for (let i = 0; i < entries.length; i++) {
    if (entries[i].$key === key) {
      entry = entries[i];
    }
  }
  return entry;
};

import * as layout from '../actions/layout';


export interface State {
  showSidenav: boolean;
  spinner: {
    isShown: boolean,
    pending: string[]
  };
}

const initialState: State = {
  showSidenav: false,
  spinner: {
    isShown: false,
    pending: []
  }
};

export function reducer(state = initialState, action: layout.Actions): State {
  switch (action.type) {
    case layout.CLOSE_SIDENAV:
      // return Object.assign({}, state, {showSidenav: false});
      return {
        ...state,
        showSidenav: false
      };

    case layout.OPEN_SIDENAV:
      return {
        ...state,
        showSidenav: true
      };

    case layout.SHOW_SPINNER: {
      const newPending = [...state.spinner.pending, action.payload];

      return {
        ...state,
        spinner: {
          pending: newPending,
          isShown: true
        }
      };
    }

    case layout.HIDE_SPINNER: {
      const newPending = state.spinner.pending.filter(item => !action.payload.includes(item));

      return {
        ...state,
        spinner: {
          pending: newPending,
          isShown: newPending.length > 0
        }
      };
    }

    default:
      return state;
  }
}

export const getShowSidenav = (state: State) => state.showSidenav;
export const getIsSpinnerShown = (state: State) => state.spinner.isShown;

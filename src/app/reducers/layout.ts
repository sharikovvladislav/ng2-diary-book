import * as layout from '../actions/layout';


export interface State {
  showSidenav: boolean;
  spinner: {
    isShown: boolean
  };
}

const initialState: State = {
  showSidenav: false,
  spinner: {
    isShown: false
  }
};

export function reducer(state = initialState, action: layout.Actions): State {
  switch (action.type) {
    case layout.CLOSE_SIDENAV:
      return {
        ...state,
        showSidenav: false
      };

    case layout.OPEN_SIDENAV:
      return {
        ...state,
        showSidenav: true
      };

    case layout.SHOW_SPINNER:
      return {
        ...state,
        spinner: {
          ...state.spinner,
          isShown: true
        }
      };

    case layout.HIDE_SPINNER:
      return {
        ...state,
        spinner: {
          ...state.spinner,
          isShown: false
        }
      };

    default:
      return state;
  }
}

export const getShowSidenav = (state: State) => state.showSidenav;
export const getIsSpinnerShown = (state: State) => state.spinner.isShown;

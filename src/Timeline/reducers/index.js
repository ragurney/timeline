import * as actionTypes from '../actionTypes';

import { COLOR_SCHEME_MAPPINGS } from '../colors';

export const defaultState = {
  selectedColorScheme: Object.keys(COLOR_SCHEME_MAPPINGS)[0],
};

const reducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case actionTypes.UPDATE_COLOR_SCHEME: {
      return {
        ...state,
        selectedColorScheme: payload.selectedColorScheme,
      };
    }

    default:
      return state;
  }
};

export default reducer;

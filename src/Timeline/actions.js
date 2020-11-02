import * as actionTypes from './actionTypes';

export const updateColorScheme = (selectedColorScheme) => ({
  type: actionTypes.UPDATE_COLOR_SCHEME,
  payload: { selectedColorScheme },
});

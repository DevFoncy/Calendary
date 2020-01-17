/*
 *
 * Calendary reducer
 *
 */
import produce from 'immer';
import { fromJS } from 'immutable';

import { WEATHER_WATCHER, WEATHER_FAILED, WEATHER_SUCCESS } from './constants';

export const initialState = fromJS({
  weather: [],
  isLoadingWeather: false,
});

function calendaryReducer(state = initialState, action) {
  switch (action.type) {
    case WEATHER_WATCHER:
      return state.set('isLoadingWeather', true).set('weather', []);
    case WEATHER_SUCCESS:
      return state
        .set('isLoadingWeather', false)
        .set('weather', action.payload);
    default:
      return state;
  }
}

export default calendaryReducer;

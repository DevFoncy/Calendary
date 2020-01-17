/*
 *
 * Calendary actions
 *
 */

import { WEATHER_SUCCESS, WEATHER_FAILED, WEATHER_WATCHER } from './constants';

export function getWeatherWatcher(params) {
  return {
    type: WEATHER_WATCHER,
    payload: params,
  };
}

export function getWeatherSuccess(payload) {
  return {
    type: WEATHER_SUCCESS,
    payload,
  };
}

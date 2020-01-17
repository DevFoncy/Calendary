import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the calendary state domain
 */

const selectCalendaryDomain = state => state.calendary || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Calendary
 */

export const makeSelectWeather = () =>
  createSelector(
    selectCalendaryDomain,
    state => state.get('weather'),
  );

export const makeSelectisLoadingWeather = () =>
  createSelector(
    selectCalendaryDomain,
    state => state.get('isLoadingWeather'),
  );

const makeSelectCalendary = () =>
  createSelector(
    selectCalendaryDomain,
    substate => substate,
  );

export default makeSelectCalendary;
export { selectCalendaryDomain };

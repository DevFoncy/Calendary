/**
 *
 * Asynchronously loads the component for WeatherResult
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));

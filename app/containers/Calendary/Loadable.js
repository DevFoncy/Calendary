/**
 *
 * Asynchronously loads the component for Calendary
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));

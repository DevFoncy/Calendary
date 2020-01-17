/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import Calendary from 'containers/Calendary';

import { message } from 'antd';
import 'index.less';
window.message = message;

export default function App() {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={Calendary} />
      </Switch>
    </Fragment>
  );
}

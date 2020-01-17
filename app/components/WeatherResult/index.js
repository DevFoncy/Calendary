/**
 *
 * WeatherResult
 *
 */

import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import './index.less';
import { Descriptions, Spin, Button } from 'antd';

export class WeatherResult extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { weather } = this.props;
    return (
      <div
        className="WeatherResult"
        style={{ display: 'grid', gridTemplateColumns: '3fr .5fr' }}
      >
        {weather.sys ? (
          <Fragment>
            <Descriptions title="Weather using Open WeatherMap for your last reminder created ( default : LIMA, PE )  ">
              <Descriptions.Item label="Forecast">
                {' '}
                {weather.weather[0].main}
              </Descriptions.Item>
              <Descriptions.Item label="Description">
                {' '}
                {weather.weather[0].description}
              </Descriptions.Item>
              <Descriptions.Item label="Country">
                {' '}
                {weather.sys.country}
              </Descriptions.Item>
              <Descriptions.Item label="Pressure">
                {weather.main.pressure}
              </Descriptions.Item>
              <Descriptions.Item label="Humidity">
                {' '}
                {weather.main.humidity}
              </Descriptions.Item>
            </Descriptions>
            <Button
              type="primary"
              icon="reload"
              onClick={this.props.callMethod}
            >
              {' '}
              Reload API
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <h1> No hay Data</h1>
          </Fragment>
        )}
      </div>
    );
  }
}

WeatherResult.propTypes = {};

export default WeatherResult;

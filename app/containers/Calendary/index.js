/**
 *
 * Calendary
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectCalendary, {makeSelectisLoadingWeather, makeSelectWeather} from './selectors';
import reducer from './reducer';
import './index.less';

import saga from './saga';

import {Layout, Menu, Breadcrumb, Spin} from 'antd';
import {getWeatherWatcher} from "./actions";
import WeatherResult from "../../components/WeatherResult";
import CalendaryComponent from "../../components/CalendaryComponent";
const { Header, Content, Footer } = Layout;

export class Calendary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showWeather: false,
    };
  }

  componentDidMount() {
    this.props.getWeatherApi();
  }

  componentWillUnmount() {}

  render() {
    // console.log('this.props',this.props);
    return (
      <Fragment>
        <Helmet>
          <title>Calendary</title>
          <meta name="description" content="Description of Calendary" />
        </Helmet>
        <Layout className="layout">
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Challengue</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
              {!this.props.isLoadingWeather ? (
                <WeatherResult callMethod={ this.props.getWeatherApi}  weather = {this.props.weather}/>
                />
              ) : (
                <div className="loadingSpin">
                  <Spin size="large"/>
                </div>
              )}
              <CalendaryComponent callMethod={ this.props.getWeatherApi}/>
            </div>
          </Content>
        </Layout>
      </Fragment>
    );
  }
}

Calendary.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  calendary: makeSelectCalendary(),
  weather: makeSelectWeather(),
  isLoadingWeather: makeSelectisLoadingWeather(),
});

function mapDispatchToProps(dispatch) {
  return {
    getWeatherApi: params => dispatch(getWeatherWatcher(params)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'calendary', reducer });
const withSaga = injectSaga({ key: 'calendary', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
)(Calendary);

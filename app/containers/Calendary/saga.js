// import { take, call, put, select } from 'redux-saga/effects';
import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { WEATHER_FAILED, WEATHER_SUCCESS, WEATHER_WATCHER } from './constants';
import { getWeatherSuccess, getWeatherWatcher } from './actions';

const APP_KEY = '74c715f5c53f1a4b46113d29b289041d';

function weatherApi(city) {
  console.log('city', city);
  let initialURL = `https://api.openweathermap.org/data/2.5/weather?q=Lima,PE&appid=74c715f5c53f1a4b46113d29b289041d`;
  if (city) {
    initialURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=74c715f5c53f1a4b46113d29b289041d`;
  }
  return axios.request({
    method: 'get',
    url: initialURL,
  });
}

export function* getWeather(params) {
  try {
    const { data } = yield call(
      weatherApi,
      params.payload !== undefined ? params.payload.city : null,
    );
    console.log('data', data);
    yield put(getWeatherSuccess(data));
    message.success('Informacion del clima cargado con exito', 3);
  } catch (error) {
    message.failed('Hubo un error usando el API, intenta en 1 minuto', 3);
    console.log('error', error);
  }
}

// Individual exports for testing
export default function* calendarySaga() {
  yield takeLatest(WEATHER_WATCHER, getWeather);
  // See example in containers/HomePage/saga.js
}

import {all} from 'redux-saga/effects';
import dataSaga from './general/generalSagas';

function* rootSaga() {
  console.log('******** Root Saga ******* ');
  yield all([dataSaga()]);
}
export default rootSaga;

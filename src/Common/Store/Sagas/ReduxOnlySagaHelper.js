import {put} from 'redux-saga/effects';
function* fetchData(action) {


    yield put({type: action.payload.reduxActionType, payload: action.payload});
  
}
export default fetchData;

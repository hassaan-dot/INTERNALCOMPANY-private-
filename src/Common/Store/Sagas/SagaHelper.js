import {put, select} from 'redux-saga/effects';
import axios from 'axios';
const getAccessToken = state => {
  console.log('Redux State:', state);
  return state.main?.OTP_response?.accessToken;
};
function* fetchData(action) {
  console.log(
    '********* MY API HITTING IN SAGA Helper ***********',
    action.payload,
  );
  const {
    apiUrl,
    requestType,
    requestConfigure,
    requestData,
    reduxActionType,
    referenceId,
    ComponentID,
    ReduxData,
    onSuccess,
    onFailure,
  } = action.payload;
  try {
    console.log('apiUrl::::', action.payload.onSuccess, onFailure);
    const accessToken = yield select(getAccessToken);
    const request = {
      headers: {
        'Content-Type': action.payload.header || 'application/json',
      },
      method: requestType,
    };
    if (accessToken) {
      console.log('Access token', accessToken);
      request.headers.Authorization = `Bearer ${accessToken}`;
    }

    let response;
    switch (requestType) {
      case 'GET':
        response = yield axios.get(apiUrl, {
          params: requestData,
          headers: request.headers,
        });
        break;

      case 'POST':
        response = yield axios.post(apiUrl, requestData, {
          headers: request.headers,
        });
        break;

      case 'PUT':
        response = yield axios.put(apiUrl, requestData, {
          headers: request.headers,
        });
        break;

      case 'DELETE':
        response = yield axios.delete(apiUrl, {
          data: requestData,
          headers: request.headers,
        });

        break;
      default:
        throw new Error(`Unsupported request type: ${requestType}`);
    }
    console.log("Action")
    if (referenceId) {
      if (ReduxData) {
        const insertId = response?.data?.payload?.insertId || 0;
        console.log('insertId', insertId);

        let updatedReduxData;

        if (requestType === 'POST') {
          if (requestConfigure=='main') {
            updatedReduxData = {
              ...ReduxData,
              ComponentID: insertId,
            };
          } else {
            updatedReduxData = {
              ...ReduxData,
              SubComponentId: insertId,
            };
          }
        } else if (requestType === 'PUT') {
          updatedReduxData = {
            ...ReduxData,
            ComponentID: ReduxData.ComponentID,
          };
        }
        yield put({
          type: reduxActionType,
          payload: response?.data?.payload || action.payload.data,
          reduxData: updatedReduxData,
          referenceId,
        });
      } else {
        yield put({
          type: reduxActionType,
          payload: response?.data?.payload || action.payload.data,
          referenceId,
          ComponentID,
        });
      }
    } else {
      yield put({
        type: reduxActionType,
        payload: response?.data?.payload || action.payload.data,
      });
    }
    if (onSuccess) {
      onSuccess(response.data);
    }
  } catch (error) {
    if (onFailure) {
      console.log('error from saga', error);
      onFailure(error.response?.data || error.message);
    }
  }
}

export default fetchData;

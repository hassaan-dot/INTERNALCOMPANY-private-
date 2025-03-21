import {takeEvery} from "redux-saga/effects";
import {
  POST_LOGIN_API,
  POST_LOGIN_OTP,
  GET_STUDENT_SEMESTER,
  GET_USER_DATA,
  GET_USER_ROLE,
  GET_COURSE_SCREEN,
  POST_ADD_CLASS_COMPONENT,
  DELETE_CLASS_COMPONENT,
  UPDATE_CLASS_COMPONENT,
  GET_SUBCOMPONENTS,
  SAVE_SUBCOMPONENTS,
  DELETE_SUBCOMPONENTS,
  EDIT_SUBCOMPONENTS,
  GET_COURSES_STUDENT_DATA,
  GET_ATTENDENCE_DETAILS,
  ATTENDENCE_SAVE
  
} from '../../Actions/General/ActionTypes/ApiActionTypes';
import fetchData from '../SagaHelper';
import reduxOnlySagaHelper from "../ReduxOnlySagaHelper"

function* dataSaga() {
  console.log("***** General Saga ******")
  yield takeEvery(POST_LOGIN_API,fetchData)
  yield takeEvery(POST_LOGIN_OTP,fetchData)
  yield takeEvery(GET_STUDENT_SEMESTER,fetchData)
  yield takeEvery(GET_USER_DATA,fetchData)
  yield takeEvery(GET_USER_ROLE,fetchData)
  yield takeEvery(GET_COURSE_SCREEN,fetchData)
  yield takeEvery(POST_ADD_CLASS_COMPONENT,fetchData)
  yield takeEvery(DELETE_CLASS_COMPONENT,fetchData)
  yield takeEvery(UPDATE_CLASS_COMPONENT,fetchData)
  yield takeEvery(GET_SUBCOMPONENTS,fetchData)
  yield takeEvery(SAVE_SUBCOMPONENTS,fetchData)
  yield takeEvery(DELETE_SUBCOMPONENTS,fetchData)
  yield takeEvery(EDIT_SUBCOMPONENTS,fetchData)
  yield takeEvery(GET_COURSES_STUDENT_DATA,fetchData)
  yield takeEvery(GET_ATTENDENCE_DETAILS,fetchData)
  yield takeEvery(ATTENDENCE_SAVE,fetchData)


  
}

export default dataSaga
  
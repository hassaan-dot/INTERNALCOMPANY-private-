import {GET_ATTENDENCE_DETAILS} from '../../ActionTypes/ApiActionTypes';
import {REDUX__SAVE_GET_ATTENDENCE_DETAILS} from '../../ActionTypes/ReduxActionTypes';
import constants from '../../../../../Constants';
export const getAttendenceData = (subjectId,courseId,onSuccess,onFailure) => {

    return {
    type: GET_ATTENDENCE_DETAILS,
    payload: {
      apiUrl:constants.get_attendance+`/0/${subjectId}/0`,
      metaData:true,
      referenceId:courseId,
      requestType: 'GET',
      reduxActionType: REDUX__SAVE_GET_ATTENDENCE_DETAILS,
      onSuccess,
      onFailure,
    },
  };
};

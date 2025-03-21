import {ATTENDENCE_SAVE} from '../../ActionTypes/ApiActionTypes';
import {REDUX_SAVE_ATTENDENCE} from '../../ActionTypes/ReduxActionTypes';
import constants from '../../../../../Constants';
export const SaveAttendence = (data, subjectId, onSuccess, onFailure) => {
  console.log('Data in save attendancce action', data,subjectId);
  return {
    type: ATTENDENCE_SAVE,
    payload: {
      apiUrl: constants.addlectureattendace,
      metaData: true,
      requestData: {
       Date:'2024-10-28',
       idObject:data
      },
      ReduxData: {
        Date:'2024-10-28',
        updatedData:data,
      },
      requestConfigure:'child',
      referenceId: subjectId,
      requestType: 'POST',
      reduxActionType: REDUX_SAVE_ATTENDENCE,
      onSuccess,
      onFailure,
    },
  };
};

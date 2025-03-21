import {GET_COURSES_STUDENT_DATA} from '../../ActionTypes/ApiActionTypes';
import {REDUX__SAVE_COURSES_STUDENT_DATA} from '../../ActionTypes/ReduxActionTypes';
import constants from '../../../../../Constants';
export const getStudentDataByCourseId = (subjectId,onSuccess,onFailure) => {
console.log("subjectId check",subjectId,)
    return {
    type: GET_COURSES_STUDENT_DATA,
    payload: {
      apiUrl:constants.getstudentincourse+`/${subjectId}`,
      metaData: true,
 
      referenceId:subjectId,
      requestType: 'GET',
      reduxActionType: REDUX__SAVE_COURSES_STUDENT_DATA,
      onSuccess,
      onFailure,
    },
  };
};

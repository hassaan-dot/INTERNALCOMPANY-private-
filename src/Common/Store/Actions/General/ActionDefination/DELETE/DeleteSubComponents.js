import {DELETE_SUBCOMPONENTS} from '../../ActionTypes/ApiActionTypes';
import {REDUX_DELETE_SUBCOMPONENTS} from '../../ActionTypes/ReduxActionTypes';
import constants from '../../../../../Constants';
export const deleteSubComponent= (userId,subComponentId,ComponentID,onSuccess,onFailure) => {
  console.log('Action Login_Api',"index",userId,subComponentId);
  return {
    type: DELETE_SUBCOMPONENTS,
    payload: {
      apiUrl: `${constants.deletesubcomponent}/${subComponentId}/${userId}`,
      metaData: true,
      ComponentID:subComponentId,
      referenceId:ComponentID,
      requestType: 'DELETE',
      reduxActionType: REDUX_DELETE_SUBCOMPONENTS,
      onSuccess,
      onFailure,
    },
  };
};

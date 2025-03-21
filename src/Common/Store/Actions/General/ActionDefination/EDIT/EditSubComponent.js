

import {EDIT_SUBCOMPONENTS} from '../..//ActionTypes/ApiActionTypes';
import {REDUX_EDIT_SAVE_SUBCOMPONENTS} from '../..//ActionTypes/ReduxActionTypes';
import constants from '../../../../../Constants';
import {ContinousBaseGesture} from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gesture';

export const EditSubComponents = (
  text,
  ComponentId,
  userRoleId,
  onSuccess,
  onFailure,
) => {
  console.log(
    'Action: SAVE_SUBCOMPONENTS',
    text,
    ComponentId,
    userRoleId,
    onSuccess,
    onFailure,
  );

  return {
    type: EDIT_SUBCOMPONENTS,
    payload: {
      apiUrl: `http://10.0.2.2:3000/api/subcomponents${ComponentId}`,
      metaData: true,
      requestData: {
        Date: '2026-08-23',
        Text: {text},
        EndTime: '01:42:00',
        NotifyUsers: '0',
        StartDate: '2024-10-7',
        StartTime: '',
        Status: 'Active',
        SubComponentNum: 44,
        TotalMarks: 0,
        Weightage: 0,
        idObject: {
          UserRoleId: userRoleId,
          ComponentID: ComponentId,
        },
      },
      requestConfigure: 'child',
      ReduxData: {
        Date: '2026-08-23',
        Text: text,
        EndTime: '01:42:00',
        NotifyUsers: '0',
        StartDate: '2024-10-6',
        StartTime: '',
        Status: 'Active',
        // SubComponentId: '',
        SubComponentNum: 44,
        TotalMarks: 0,
        Weightage: 0,
        idObject: {
          UserRoleId: userRoleId,
          ComponentID: ComponentId,
        },
      },

      referenceId: ComponentId,
      requestType: 'POST',
      reduxActionType: REDUX_EDIT_SAVE_SUBCOMPONENTS,
      onSuccess,
      onFailure,
    },
  };
};

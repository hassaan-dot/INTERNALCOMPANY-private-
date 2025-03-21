import {sub} from 'react-native-reanimated';
import {
  REDUX_LOGIN_API_RESPONSE,
  REDUX_LOGIN_OTP_RESPONSE,
  REDUX_SAVE_STUDENT_SEMESTER,
  REDUX_SAVE_USER_ROLE,
  REDUX_SAVE_USER_DATA,
  REDUX_SAVE_COURSES_SCREEN,
  REDUX_SAVE_ADD_CLASS_COMPONENT,
  REDUX_SAVE_UPDATE_CLASS_COMPONENT,
  REDUX_DELETE_CLASS_COMPONENT,
  REDUX_GET_SAVE_SUBCOMPONENTS,
  REDUX_ADD_SAVE_SUBCOMPONENTS,
  REDUX_DELETE_SUBCOMPONENTS,
  REDUX__SAVE_COURSES_STUDENT_DATA,
  REDUX__SAVE_GET_ATTENDENCE_DETAILS,
  REDUX_SAVE_ATTENDENCE,
} from '../Actions/General/ActionTypes/ReduxActionTypes';
import {act} from 'react';

const initialState = {
  login_response: {},
  OTP_response: {},
  courses: [],
  coursesComponents: {},
  StudentSemester: {},
  UserRole: {},
  UserData: {},
  subComponents: [],
  studentDataByCourses: [],
  attendenceDetails: [],
};

const reducer = (state = initialState, action) => {
  const {referenceId, payload, reduxData, ComponentID} = action;

  console.log('action', action);
  switch (action.type) {
    case REDUX_LOGIN_API_RESPONSE:
      return {
        ...state,
        login_response: action?.payload?.data,
      };
      case REDUX_LOGIN_OTP_RESPONSE:
        console.log('MainReducer', action);
        return {
          ...state,
          OTP_response: action?.payload,
          courses: action?.payload?.studentData 
        };

    case REDUX_SAVE_COURSES_SCREEN:
      return {
        ...state,
        coursesComponents: {
          ...state.coursesComponents,
          [referenceId]: [
            ...(state.coursesComponents[referenceId] || []),
            ...payload,
          ],
        },
      };
    case REDUX_SAVE_ADD_CLASS_COMPONENT: {
      const courseComponentsForId = state.coursesComponents[referenceId] || [];
      const componentExists = courseComponentsForId.find(
        component => component.ComponentID === reduxData.ComponentID,
      );
      let updatedCourseComponents;
      if (componentExists) {
        updatedCourseComponents = courseComponentsForId.map(component =>
          component.ComponentID === reduxData.ComponentID
            ? {...component, ...reduxData}
            : component,
        );
      } else {
        updatedCourseComponents = [...courseComponentsForId, reduxData];
      }
      // updatedCourseComponents.sort((b,a) => b.ComponentID - a.ComponentID);
      return {
        ...state,
        coursesComponents: {
          ...state.coursesComponents,
          [referenceId]: updatedCourseComponents,
        },
      };
    }

    case REDUX_SAVE_UPDATE_CLASS_COMPONENT: {
      const courseComponentsForId = state.coursesComponents[referenceId] || [];
      const updatedComponents = courseComponentsForId.map(component =>
        component.ComponentID === reduxData.ComponentID
          ? {...component, ...reduxData}
          : component,
      );
      return {
        ...state,
        coursesComponents: {
          ...state.coursesComponents,
          [referenceId]: updatedComponents,
        },
      };
    }

    case REDUX_DELETE_CLASS_COMPONENT: {
      const courseComponentsForId = state.coursesComponents[referenceId] || [];
      const filteredComponents = courseComponentsForId.filter(
        component => component.ComponentID !== ComponentID,
      );
      return {
        ...state,
        coursesComponents: {
          ...state.coursesComponents,
          [referenceId]: filteredComponents,
        },
      };
    }

    case REDUX_GET_SAVE_SUBCOMPONENTS:
      return {
        ...state,
        subComponents: {
          ...state.subComponents,
          [referenceId]: [
            ...(state.subComponents[referenceId] || []),
            ...payload,
          ],
        },
      };

    case REDUX_ADD_SAVE_SUBCOMPONENTS:
      const courseComponentsForId = state.subComponents[referenceId] || [];
      const componentExists = courseComponentsForId.find(
        component => component.SubComponentNum === reduxData.SubComponentNum,
      );
      let updatedCourseComponents;
      if (componentExists) {
        console.log('REDUX DATA:::::::', reduxData);
        updatedCourseComponents = courseComponentsForId.map(component =>
          component.SubComponentNum === reduxData.SubComponentNum
            ? {...component, ...reduxData}
            : component,
        );
      } else {
        console.log('REDUX DATA:::::::', reduxData);
        updatedCourseComponents = [...courseComponentsForId, reduxData];
      }
      return {
        ...state,
        subComponents: {
          ...state.subComponents,
          [referenceId]: updatedCourseComponents,
        },
      };
    case REDUX_DELETE_SUBCOMPONENTS: {
      const courseComponentsForIdDelete =
        state.subComponents[referenceId] || [];
      const updatedCourseComponentsAfterDelete =
        courseComponentsForIdDelete.filter(
          component => component.SubComponentId !== ComponentID,
        );
      return {
        ...state,
        subComponents: {
          ...state.subComponents,
          [referenceId]: updatedCourseComponentsAfterDelete,
        },
      };
    }

    case REDUX__SAVE_COURSES_STUDENT_DATA:
      return {
        ...state,
        studentDataByCourses: {
          ...state.studentDataByCourses,
          [referenceId]: [
            ...(state.studentDataByCourses[referenceId] || []),
            ...payload,
          ],
        },
      };
    // case REDUX__SAVE_GET_ATTENDENCE_DETAILS:
    //   return {
    //     ...state,
    //     attendenceDetails: {
    //       ...state.attendenceDetails,
    //       [referenceId]: [
    //         ...(state.attendenceDetails[referenceId] || []),
    //         ...payload,
    //       ],
    //     },
    //   };
    case REDUX__SAVE_GET_ATTENDENCE_DETAILS:
      return {
        ...state,
        attendenceDetails: {
          ...state.attendenceDetails,
          [referenceId]: [
            ...(state.attendenceDetails[referenceId] || []),
            ...payload.filter(item => item.EnrollementId !== null),
          ],
        },
      };

    case REDUX_SAVE_ATTENDENCE:
      console.log('reducer redux data::::::: redux: ', action.reduxData);
      console.log('reducer redux data::::::: action: ', action);

      return {
        ...state,
        attendenceDetails: {
          ...state.attendenceDetails,
          [referenceId]: state.attendenceDetails[referenceId]
            ? [reduxData?.updatedData] // Replace existing data if referenceId exists
            : [
                reduxData?.updatedData,
                ...(state.attendenceDetails[referenceId] || []),
              ], // Add new data if referenceId does not exist
        },
      };

    default:
      return state;
  }
};

export default reducer;

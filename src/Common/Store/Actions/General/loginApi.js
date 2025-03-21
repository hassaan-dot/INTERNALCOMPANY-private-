// import {POST_LOGIN_API} from './ActionTypes/ApiActionTypes';
// import {REDUX_LOGIN_API_RESPONSE} from './ActionTypes/ReduxActionTypes'
// import constants from '../../../Constants';
// export const loginApi = (email,password,token_2fa='token',onSuccess,onFailure) => {
//   console.log("Action Login_Api");
//   return{
//         type:POST_LOGIN_API,
//         payload:{
//             apiUrl:constants.login_api,
//             metaData:true,
//             header:"application/json",
//             requestData: { 'email':{email}, 'password':{password},'token_2fa':{token_2fa} }, 
//             requestType:'POST',
//             reduxActionType:REDUX_LOGIN_API_RESPONSE,
//             onSuccess,
//             onFailure 
//         }
//   }
// }
// import { POST_LOGIN_API } from './ActionTypes/ApiActionTypes';
// import { REDUX_LOGIN_API_RESPONSE } from './ActionTypes/ReduxActionTypes';
// import constants from '../../../Constants';

// export const loginApi = (email, password, token_2fa = 'optional', onSuccess, onFailure) => {
//   console.log("Action Login_Api");
//   console.log("API URL:", constants.login_api);

//   return {
//     type: POST_LOGIN_API,
//     payload: {
//       apiUrl: constants.login_api,
//       metaData: true,
//       header: "application/json",
//       requestData: JSON.stringify({
//         email,
//         password,
//         ...(token_2fa && { token_2fa })  // Include token_2fa only if provided
//       }),
//       requestType: 'POST',
//       reduxActionType: REDUX_LOGIN_API_RESPONSE,
//       onSuccess,
//       onFailure 
//     }
//   };
// };
import { POST_LOGIN_API } from './ActionTypes/ApiActionTypes';
import { REDUX_LOGIN_API_RESPONSE } from './ActionTypes/ReduxActionTypes';
import constants from '../../../Constants';

export const loginApi = (email, password, token_2fa = '', onSuccess, onFailure) => {
  console.log("Action Login_Api", email, password, token_2fa);

  return {
    type: POST_LOGIN_API,
    payload: {
      apiUrl: constants.login_api,
      metaData: true,
      headers: { "Content-Type": "application/json" },
      requestData: {
        email, 
        password, 
        ...(token_2fa && { token_2fa }) // Only include token_2fa if it's provided
      },
      requestType: "POST",
      reduxActionType: REDUX_LOGIN_API_RESPONSE,
      onSuccess,
      onFailure,
    }
  };
};
// import { POST_LOGIN_API } from './ActionTypes/ApiActionTypes';
// import { REDUX_LOGIN_API_RESPONSE } from './ActionTypes/ReduxActionTypes';
// import constants from '../../../Constants';

// export const loginApi = (email, password, token_2fa = '', onSuccess, onFailure) => {
//   return async (dispatch) => {
//     try {
//       console.log("Action Login_Api", email, password, token_2fa);

//       const requestData = {
//         email, 
//         password, 
//         ...(token_2fa && { token_2fa }) // Only include token_2fa if provided
//       };

//       const response = await fetch(constants.login_api, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(requestData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         dispatch({
//           type: REDUX_LOGIN_API_RESPONSE,
//           payload: data,
//         });
//         onSuccess && onSuccess(data);
//       } else {
//         onFailure && onFailure(data);
//       }
//     } catch (error) {
//       console.error("Login API Error:", error);
//       onFailure && onFailure({ error: "Network error or server issue" });
//     }
//   };
// };

import {RELOAD_HOME} from './ActionTypes/ApiActionTypes';
import {REDUX_RELOAD_HOME} from './ActionTypes/ReduxActionTypes'
import constants from '../../../Constants';
export const  FetchingData=(status)=>{
    return {
        type: RELOAD_HOME,
        payload: {
            onlyRedux:true,
            payload:status,
            reduxActionType:REDUX_RELOAD_HOME,

        }
    
     }
}
import { userConstants } from '../_constants';

export function ideaStatusList(state = {}, action) {
  switch (action.type) {
    
    case userConstants.GETIDEASTATUS_REQUEST:
        return {
            loading: true
          };
    case userConstants.GETIDEASTATUS_SUCCESS:
        return {
          ideaStatusList: action.data
          };
    case userConstants.GETIDEASTATUS_FAILURE:
        return [];    
    default:
      return state
  }
}
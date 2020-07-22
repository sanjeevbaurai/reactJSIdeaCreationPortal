import { userConstants } from '../_constants';

export function userInfo(state = {}, action) {
  switch (action.type) {
  
    case userConstants.GETUSERINFO_REQUEST:
        return {
            loading: true
          };
    case userConstants.GETUSERINFO_SUCCESS:
        return {
          userInfo: action.data
          };
    case userConstants.GETUSERINFO_FAILURE:
          return [];  
                
    default:
      return state
  }
}
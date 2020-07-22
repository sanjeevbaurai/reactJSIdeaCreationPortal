import { userConstants } from '../_constants';

export function accountUserList(state = {}, action) {
  switch (action.type) {
    
    case userConstants.GETUSERLIST_REQUEST:
        return {
            loading: true
          };
    case userConstants.GETUSERLIST_SUCCESS:
        return {
          userList: action.data
          };
    case userConstants.GETUSERLIST_FAILURE:
        return [];    
    default:
      return state
  }
}
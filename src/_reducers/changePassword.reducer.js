import { userConstants } from '../_constants';

export function changePassword(state = {}, action) {
  switch (action.type) {
    
    case userConstants.CHANGEPASSWORD_REQUEST:
        return {
            loading: true
          };
    case userConstants.CHANGEPASSWORD_SUCCESS:
        return {
          user: action.data
          };
    case userConstants.CHANGEPASSWORD_FAILURE:
        return [];    
    default:
      return state
  }
}
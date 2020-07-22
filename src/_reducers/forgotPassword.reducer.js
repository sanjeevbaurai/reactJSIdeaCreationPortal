import { userConstants } from '../_constants';

export function forgotPassword(state = {}, action) {
  switch (action.type) {
    
    case userConstants.FORGOTPASSWORD_REQUEST:
        return {
            loading: true
          };
    case userConstants.FORGOTPASSWORD_SUCCESS:
        return {
          user: action.data
          };
    case userConstants.FORGOTPASSWORD_FAILURE:
        return [];    
    default:
      return state
  }
}
import { userConstants } from '../_constants';

export function addAccount(state = {}, action) {
  switch (action.type) {
    
    case userConstants.ADDACCOUNT_REQUEST:
        return {
            loading: true
          };
    case userConstants.ADDACCOUNT_SUCCESS:
        return {
          addAccount: action.data
          };
    case userConstants.ADDACCOUNT_FAILURE:
        return [];    
    default:
      return state
  }
}
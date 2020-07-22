import { userConstants } from '../_constants';

export function deleteAccount(state = {}, action) {
  switch (action.type) {
    
    case userConstants.DELETEACCOUNT_REQUEST:
        return {
            loading: true
          };
    case userConstants.DELETEACCOUNT_SUCCESS:
        return {
          deleteAccount: action.data
          };
    case userConstants.DELETEACCOUNT_FAILURE:
        return [];    
    default:
      return state
  }
}
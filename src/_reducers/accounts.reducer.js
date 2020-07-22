import { userConstants } from '../_constants';

export function accounts(state = {}, action) {
  switch (action.type) {
    
    case userConstants.GETACCOUNTS_REQUEST:
        return {
            loading: true
          };
    case userConstants.GETACCOUNTS_SUCCESS:
        return {
          accounts: action.accounts
          };
    case userConstants.GETACCOUNTS_FAILURE:
        return [];    
    default:
      return state
  }
}
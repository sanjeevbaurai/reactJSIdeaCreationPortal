import { userConstants } from '../_constants';

export function accountRequest(state = {}, action) {
  switch (action.type) {
    
    case userConstants.REQUESTFORACCOUNTACCESS_REQUEST:
        return {
            loading: true
          };
    case userConstants.REQUESTFORACCOUNTACCESS_SUCCESS:
        return {
          accountRequest: action.data
          };
    case userConstants.REQUESTFORACCOUNTACCESS_FAILURE:
        return [];    
    default:
      return state
  }
}
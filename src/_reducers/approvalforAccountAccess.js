import { userConstants } from '../_constants';

export function accountApproval(state = {}, action) {
  switch (action.type) {
    
    case userConstants.MANAGERAPPROVAL_REQUEST:
        return {
            loading: true
          };
    case userConstants.MANAGERAPPROVAL_SUCCESS:
        return {
          accountApproval: action.notification
          };
    case userConstants.MANAGERAPPROVAL_FAILURE:
        return [];    
    default:
      return state
  }
}
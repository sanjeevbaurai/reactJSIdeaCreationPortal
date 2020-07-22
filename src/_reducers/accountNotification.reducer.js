import { userConstants } from '../_constants';

export function accountNotifications(state = {}, action) {
  switch (action.type) {
    
    case userConstants.ACCOUNTREQUESTNOTIFICATION_REQUEST:
        return {
            loading: true
          };
    case userConstants.ACCOUNTREQUESTNOTIFICATION_SUCCESS:
        return {
          accountNotifications: action.notification
          };
    case userConstants.ACCOUNTREQUESTNOTIFICATION_FAILURE:
        return [];    
    default:
      return state
  }
}
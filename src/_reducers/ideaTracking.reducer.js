import { userConstants } from '../_constants';

export function trackingIdeas(state = {}, action) {
  switch (action.type) {
    
    case userConstants.GETIDEATRACKING_REQUEST:
        return {
            loading: true
          };
    case userConstants.GETIDEATRACKING_SUCCESS:
        return {
          trackingIdeas: action.data
          };
    case userConstants.GETIDEATRACKING_FAILURE:
        return [];    
    default:
      return state
  }
}
import { userConstants } from '../_constants';

export function approveIdeas(state = {}, action) {
  switch (action.type) {
    
    case userConstants.GETIDEAPPROVE_REQUEST:
        return {
            loading: true
          };
    case userConstants.GETIDEAPPROVE_SUCCESS:
        return {
          approveIdeas: action.data
          };
    case userConstants.GETIDEAPPROVE_FAILURE:
        return [];    
    default:
      return state
  }
}
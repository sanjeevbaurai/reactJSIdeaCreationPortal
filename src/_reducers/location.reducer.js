import { userConstants } from '../_constants';

export function locations(state = {}, action) {
  switch (action.type) {
    
    case userConstants.GETLOCATION_REQUEST:
        return {
            loading: true
          };
    case userConstants.GETLOCATION_SUCCESS:
        return {
          locations: action.locations
          };
    case userConstants.GETLOCATION_FAILURE:
        return [];    
    default:
      return state
  }
}
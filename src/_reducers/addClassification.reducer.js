import { userConstants } from '../_constants';

export function addClassification(state = {}, action) {
  switch (action.type) {
    
    case userConstants.GETADDCLASSIFICATION_REQUEST:
        return {
            loading: true
          };
    case userConstants.GETADDCLASSIFICATION_SUCCESS:
        return {
          addClassification: action.data
          };
    case userConstants.GETADDCLASSIFICATION_FAILURE:
        return [];    
    default:
      return state
  }
}
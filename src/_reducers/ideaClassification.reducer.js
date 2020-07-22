import { userConstants } from '../_constants';

export function ideaClassification(state = {}, action) {
  switch (action.type) {
           
    case userConstants.GETIDEACLASSIFICATION_REQUEST:
          return {
              loading: true
            };
      case userConstants.GETIDEACLASSIFICATION_SUCCESS:
          return {
            ideaClassification: action.classificationList
            };
      case userConstants.GETIDEACLASSIFICATION_FAILURE:
            return [];       
    default:
      return state
  }
}
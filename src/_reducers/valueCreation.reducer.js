import { userConstants } from '../_constants';

export function ideaClassification(state = {}, action) {
  switch (action.type) {
    case userConstants.GETQUESTIONS_REQUEST:
      return {
          loading: true
        };
    case userConstants.GETQUESTIONS_SUCCESS:
      return {
          items: action.securityQuestions
        };
    case userConstants.GETQUESTIONS_FAILURE:
       return [];
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
    case userConstants.GETIDEATHEME_REQUEST:
        return {
            loading: true
          };
    case userConstants.GETIDEATHEME_SUCCESS:
        return {
            items: action.accounts
          };
    case userConstants.GETACCOUNTS_FAILURE:
          return [];  
           
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
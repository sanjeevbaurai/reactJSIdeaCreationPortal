import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    getAllUsers,
    changePassword,
    forgotPasword,
    getQuestionList,
    getAccountList,
    getIdeaTheme,
    getIdeaClassification,
    getIdeaLocation,
    getIdeaFor,
    getAdditionalClassification,
    getIdeaStatus,
    fetchIdeasforApproval,
    fetchIdeasforTracking,
    fetchSubmittedIdea,
    fetchSavedIdea,
    fetchAllIdeas,
    addAccount,
    deleteAccount,
    requestForAccountAccess, //Request For Access
   // notifications,  // Request for notifications
  //  accountMappings, // to fetch notification
    fetchAccountRequestNotification, //Manager's Notification
    managerApprovalForAccountAccess, //For Manager's Approval for a User
    getUserList, //Returning Users Associated to a particular Account
    addUserRole, //Adding User Role for particular Account.
    getUserInfo
    // getAll,
    // delete: _delete
};

function login( loginId, password) {
    return async dispatch => {

        try {
            dispatch(request({ loginId,password }));
            const response = await  userService.login( loginId, password);//axios.get(url);
            dispatch(success(response));
            history.push('/');
          }
          catch(error) {
            dispatch(failure(error.toString()));
            dispatch(alertActions.error(error.toString()));
          }
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return async dispatch => {
        dispatch(request(user));

        try {
            const response = await userService.register(user);
            dispatch(success(response));
            history.push('/login');
            dispatch(alertActions.success('Registration successful'));
          }
          catch(error) {
            dispatch(failure(error.toString()));
            dispatch(alertActions.error(error.toString()));
          }
        // userService.register(user)
        //     .then(
        //         user => { 
        //             dispatch(success());
        //             history.push('/login');
        //             dispatch(alertActions.success('Registration successful'));
        //         },
        //         error => {
        //             dispatch(failure(error.toString()));
        //             dispatch(alertActions.error(error.toString()));
        //         }
        //     );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAllUsers() {
    return async dispatch => {
        dispatch(request());

        try {
            const response = await userService.getAllUsers();
            dispatch(success(response));
           
          }
          catch(error) {
            dispatch(failure(error.toString()));
            dispatch(alertActions.error(error.toString()));
          }
        // userService.getAllUsers()
        //     .then(
        //         users => dispatch(success(users)),
        //         error => dispatch(failure(error.toString()))
        //     );
    };

    function request() { return { type: userConstants.GETALLUSERS_REQUEST } }
    function success(users) { return { type: userConstants.GETALLUSERS_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALLUSERS_FAILURE, error } }
}

function changePassword(userLogin,oldPassword,password) {
    return dispatch => {
        dispatch(request());
        userService.changePassword(userLogin,oldPassword,password)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Password changed successfully'));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.CHANGEPASSWORD_REQUEST } }
    function success(user) { return { type: userConstants.CHANGEPASSWORD_SUCCESS, user } }
    function failure(error) { return { type: userConstants.CHANGEPASSWORD_FAILURE, error } }
}

function forgotPasword(user){//userLogin,securityQus,securityAns) {
    return dispatch => {
        dispatch(request());

        userService.forgotPasword(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('New password sent to your mail id'));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.FORGOTPASSWORD_REQUEST } }
    function success(user) { return { type: userConstants.FORGOTPASSWORD_SUCCESS, user } }
    function failure(error) { return { type: userConstants.FORGOTPASSWORD_FAILURE, error } }
}

function getQuestionList() {
    return async dispatch => {
        dispatch(request());

        try {
            const response = await userService.getQuestionList();
            dispatch(success(response));
           
          }
          catch(error) {
            dispatch(failure(error.toString()));
            dispatch(alertActions.error(error.toString()));
          }
        // userService.getQuestionList()
        //     .then(
        //         questions => dispatch(success(questions)),
        //         error => dispatch(failure(error.toString()))
        //     );
    };

    function request() { return { type: userConstants.GETQUESTIONS_REQUEST } }
    function success(questions) { return { type: userConstants.GETQUESTIONS_SUCCESS, questions } }
    function failure(error) { return { type: userConstants.GETQUESTIONS_FAILURE, error } }
}

function getAccountList() {
    return  async dispatch => {
        dispatch(request());

        try {
            const response = await userService.getAccountList();
            dispatch(success(response));
           
          }
          catch(error) {
            dispatch(failure(error.toString()));
            dispatch(alertActions.error(error.toString()));
          }

        // userService.getAccountList()
        //     .then(
        //         accounts => dispatch(success(accounts)),
        //         error => dispatch(failure(error.toString()))
        //     );
    };

    function request() { return { type: userConstants.GETACCOUNTS_REQUEST } }
    function success(accounts) { return { type: userConstants.GETACCOUNTS_SUCCESS, accounts } }
    function failure(error) { return { type: userConstants.GETACCOUNTS_FAILURE, error } }
}

 function getIdeaTheme(accountId){
    return async dispatch => {
        dispatch(request(accountId));

        try {
          const response = await userService.getIdeaTheme(accountId);;
            dispatch(success(response));
           
          }
          catch(error) {
            dispatch(failure(error.toString()));
            dispatch(alertActions.error(error.toString()));
          }
        // userService.getIdeaTheme(accountId)
        //     .then(
        //         ideaTheme => dispatch(success(ideaTheme)),
        //         error => dispatch(failure(error.toString()))
        //     );
    };

    function request() { return { type: userConstants.GETIDEATHEME_REQUEST } }
    function success(ideaTheme) { return { type: userConstants.GETIDEATHEME_SUCCESS, ideaTheme } }
    function failure(error) { return { type: userConstants.GETIDEATHEME_FAILURE, error } }
}


function getIdeaClassification(){
    return async dispatch => {
        dispatch(request());

        try {
            const response = await userService.getIdeaClassification();
            dispatch(success(response));
           
          }
          catch(error) {
            dispatch(failure(error.toString()));
            dispatch(alertActions.error(error.toString()));
          }
        // userService.getIdeaClassification()
        //     .then(
        //         classificationList => dispatch(success(classificationList)),
        //         error => dispatch(failure(error.toString()))
        //     );
    };

    function request() { return { type: userConstants.GETIDEACLASSIFICATION_REQUEST } }
    function success(classificationList) { return { type: userConstants.GETIDEACLASSIFICATION_SUCCESS, classificationList } }
    function failure(error) { return { type: userConstants.GETIDEACLASSIFICATION_FAILURE, error } }
}
function getIdeaLocation(){
    return async dispatch => {
        dispatch(request());

        try {
            const response = await userService.getIdeaLocation();
            dispatch(success(response));
           
          }
          catch(error) {
            dispatch(failure(error.toString()));
            dispatch(alertActions.error(error.toString()));
          }
        // userService.getIdeaLocation()
        //     .then(
        //         locations => dispatch(success(locations)),
        //         error => dispatch(failure(error.toString()))
        //     );
    };

    function request() { return { type: userConstants.GETLOCATION_REQUEST } }
    function success(locations) { return { type: userConstants.GETLOCATION_SUCCESS, locations } }
    function failure(error) { return { type: userConstants.GETLOCATION_FAILURE, error } }
}

function getIdeaFor(){
    return async dispatch => {
        dispatch(request());

        try {
            const response = await userService.getIdeaFor();
            dispatch(success(response));
           
          }
          catch(error) {
            dispatch(failure(error.toString()));
            dispatch(alertActions.error(error.toString()));
          }
        // userService.getIdeaFor()
        //     .then(
        //         locations => dispatch(success(locations)),
        //         error => dispatch(failure(error.toString()))
        //     );
    };

    function request() { return { type: userConstants.GETIDEAFOR_REQUEST } }
    function success(data) { return { type: userConstants.GETIDEAFOR_SUCCESS, data } }
    function failure(error) { return { type: userConstants.GETIDEAFOR_FAILURE, error } }
}

function getAdditionalClassification(){
    return async dispatch => {
        dispatch(request());
        try {
            const response = await userService.getAdditionalClassification();
            dispatch(success(response));
           
          }
          catch(error) {
            dispatch(failure(error.toString()));
            dispatch(alertActions.error(error.toString()));
          }
        // userService.getAdditionalClassification()
        //     .then(
        //         data => dispatch(success(data)),
        //         error => dispatch(failure(error.toString()))
        //     );
    };

    function request() { return { type: userConstants.GETADDCLASSIFICATION_REQUEST } }
    function success(data) { return { type: userConstants.GETADDCLASSIFICATION_SUCCESS, data } }
    function failure(error) { return { type: userConstants.GETADDCLASSIFICATION_FAILURE, error } }
}



function  getIdeaStatus(role){
    return async dispatch => {
        dispatch(request());

        try {
            const response = await userService.getIdeaStatus(role);
            dispatch(success(response));
           
          }
          catch(error) {
            dispatch(failure(error.toString()));
            dispatch(alertActions.error(error.toString()));
          }
        // userService.getIdeaStatus(role)
        //     .then(
        //         data => dispatch(success(data)),
        //         error => dispatch(failure(error.toString()))
        //     );
    };

    function request() { return { type: userConstants.GETIDEASTATUS_REQUEST } }
    function success(data) { return { type: userConstants.GETIDEASTATUS_SUCCESS, data } }
    function failure(error) { return { type: userConstants.GETIDEASTATUS_FAILURE, error } }
}

function fetchIdeasforApproval(role,account,section){
    return async dispatch => {
        dispatch(request());
        try {
            const response = await userService.fetchIdeasforApproval(role,account,section);
            dispatch(success(response));
           
          }
          catch(error) {
            dispatch(failure(error.toString()));
            dispatch(alertActions.error(error.toString()));
          }

        // userService.fetchIdeasforApproval(role,account,section)
        //     .then(
        //         data => dispatch(success(data)),
        //         error => dispatch(failure(error.toString()))
        //     );
    };

    function request() { return { type: userConstants.GETIDEAPPROVE_REQUEST } }
    function success(data) { return { type: userConstants.GETIDEAPPROVE_SUCCESS, data } }
    function failure(error) { return { type: userConstants.GETIDEAPPROVE_FAILURE, error } }
}

function fetchIdeasforTracking(role,account,section){
    return async dispatch => {
        dispatch(request());
      
        try {
            const response = await userService.fetchIdeasforTracking(role,account,section);
            dispatch(success(response));
           
          }
          catch(error) {
            dispatch(failure(error.toString()));
            dispatch(alertActions.error(error.toString()));
          }
        // userService.fetchIdeasforTracking(role,account,section)
        //     .then(
        //         data => dispatch(success(data)),
        //         error => dispatch(failure(error.toString()))
        //     );
    };

    function request() { return { type: userConstants.GETIDEATRACKING_REQUEST } }
    function success(data) { return { type: userConstants.GETIDEATRACKING_SUCCESS, data } }
    function failure(error) { return { type: userConstants.GETIDEATRACKING_FAILURE, error } }
}
 
 function fetchSubmittedIdea(userId,ideaStatus){
    return async dispatch => {
        dispatch(request());

        try {
            const response = await userService.fetchSubmittedIdea(userId,ideaStatus);
            dispatch(success(response));
          }
          catch(error) {
           dispatch(failure(error.toString()));
           dispatch(alertActions.error(error.toString()));
            //data => dispatch(success(data)),
           // error => dispatch(failure(error.toString()))
          }

        // userService.fetchSubmittedIdea(userId,ideaStatus)
        //     .then(
        //         data => dispatch(success(data)),
        //         error => dispatch(failure(error.toString()))
        //     );
    };

    function request() { return { type: userConstants.GETSUBMITTEDIDEA_REQUEST } }
    function success(data) { return { type: userConstants.GETSUBMITTEDIDEA_SUCCESS, data } }
    function failure(error) { return { type: userConstants.GETSUBMITTEDIDEA_FAILURE, error } }
}
function fetchSavedIdea(userId,ideaStatus){
    return async dispatch => {
        dispatch(request());

        try {
            const response = await userService.fetchSavedIdea(userId,ideaStatus);
            dispatch(success(response));
           
          }
          catch(error) {
            dispatch(failure(error.toString()));
            dispatch(alertActions.error(error.toString()));
          }
        // userService.fetchSavedIdea(userId,ideaStatus)
        //     .then(
        //         data => dispatch(success(data)),
        //         error => dispatch(failure(error.toString()))
        //     );
    };

    function request() { return { type: userConstants.GETSAVEDIDEA_REQUEST } }
    function success(data) { return { type: userConstants.GETSAVEDIDEA_SUCCESS, data } }
    function failure(error) { return { type: userConstants.GETSAVEDIDEA_FAILURE, error } }
}

function fetchAllIdeas(title,status,ideaClassification,account,startDate,endDate,pageNumber,numberOfData){
    return async dispatch => {
        dispatch(request());

        try {
            const response = await userService.fetchAllIdeas(title,status,ideaClassification,account,startDate,endDate,pageNumber,numberOfData);
            dispatch(success(response));
           
          }
          catch(error) {
            dispatch(failure(error.toString()));
            dispatch(alertActions.error(error.toString()));
          }
         
          
        // userService.fetchAllIdeas(title,status,ideaClassification,account,startDate,endDate,pageNumber,numberOfData)
        //     .then(
        //         data => dispatch(success(data)),
        //         error => dispatch(failure(error.toString()))
        //     );
    };

    function request() { return { type: userConstants.GETALLIDEAS_REQUEST } }
    function success(data) { return { type: userConstants.GETALLIDEAS_SUCCESS, data } }
    function failure(error) { return { type: userConstants.GETALLIDEAS_FAILURE, error } }
}

function addAccount(accountName){
    return async dispatch => {
        dispatch(request());
        try {
            const response = await userService.addAccount(accountName);
            dispatch(success(response));
           
          }
          catch(error) {
            dispatch(failure(error.toString()));
            dispatch(alertActions.error(error.toString()));
          }
        // userService.addAccount(accountName)
        //     .then(
        //         data => dispatch(success(data)),
        //         error => dispatch(failure(error.toString()))
        //     );
    };

    function request() { return { type: userConstants.ADDACCOUNT_REQUEST } }
    function success(data) { return { type: userConstants.ADDACCOUNT_SUCCESS, data } }
    function failure(error) { return { type: userConstants.ADDACCOUNT_FAILURE, error } }
}

function deleteAccount(accountName){
    return dispatch => {
        dispatch(request());

        userService.deleteAccount(accountName)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.DELETEACCOUNT_REQUEST } }
    function success(data) { return { type: userConstants.DELETEACCOUNT_SUCCESS, data } }
    function failure(error) { return { type: userConstants.DELETEACCOUNT_FAILURE, error } }
}

function requestForAccountAccess(userId, accountId, reason){
  return dispatch => {
      dispatch(request());

      userService.requestForAccountAccess(userId, accountId, reason)
          .then(
              data => dispatch(success(data)),
              error => dispatch(failure(error.toString()))
          );
  };

  function request() { return { type: userConstants.REQUESTFORACCOUNTACCESS_REQUEST } }
  function success(data) { return { type: userConstants.REQUESTFORACCOUNTACCESS_SUCCESS, data } }
  function failure(error) { return { type: userConstants.REQUESTFORACCOUNTACCESS_FAILURE, error } }
}

function fetchAccountRequestNotification(userId){
  return dispatch => {
      dispatch(request());

      userService.fetchAccountRequestNotification(userId)
          .then(
              notification => dispatch(success(notification)),
              error => dispatch(failure(error.toString()))
          );
  };

  function request() { return { type: userConstants.ACCOUNTREQUESTNOTIFICATION_REQUEST } }
  function success(notification) { return { type: userConstants.ACCOUNTREQUESTNOTIFICATION_SUCCESS, notification } }
  function failure(error) { return { type: userConstants.ACCOUNTREQUESTNOTIFICATION_FAILURE, error } }
}

function managerApprovalForAccountAccess(recordId, userId, accountId, action){
  return dispatch => {
      dispatch(request());

      userService.managerApprovalForAccountAccess(recordId, userId, accountId, action)
          .then(
              data => dispatch(success(data)),
              error => dispatch(failure(error.toString()))
          );
  };

  function request() { return { type: userConstants.MANAGERAPPROVAL_REQUEST } }
  function success(data) { return { type: userConstants.MANAGERAPPROVAL_SUCCESS, data } }
  function failure(error) { return { type: userConstants.MANAGERAPPROVAL_FAILURE, error } }
}
function getUserList(recordId){

  return async dispatch => {
    dispatch(request());
    try {
        const response = await userService.getUserList(recordId);
        dispatch(success(response));
       
      }
      catch(error) {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
};

  function request() { return { type: userConstants.GETUSERLIST_REQUEST } }
  function success(data) { return { type: userConstants.GETUSERLIST_SUCCESS, data } }
  function failure(error) { return { type: userConstants.GETUSERLIST_FAILURE, error } }
}
function addUserRole(userId, accountId, roleId){
  return dispatch => {
      dispatch(request());

      userService.addUserRole(userId,accountId, roleId)
          .then(
              data => dispatch(success(data)),
              error => dispatch(failure(error.toString()))
          );
  };

  function request() { return { type: userConstants.ADDUSERROLE_REQUEST } }
  function success(data) { return { type: userConstants.ADDUSERROLE_SUCCESS, data } }
  function failure(error) { return { type: userConstants.ADDUSERROLE_FAILURE, error } }
}

function getUserInfo (userRecordId){
  return dispatch => {
      dispatch(request());

      userService.getUserInfo(userRecordId)
          .then(
              data => dispatch(success(data)),
              error => dispatch(failure(error.toString()))
          );
  };

  function request() { return { type: userConstants.GETUSERINFO_REQUEST } }
  function success(data) { return { type: userConstants.GETUSERINFO_SUCCESS, data } }
  function failure(error) { return { type: userConstants.GETUSERINFO_FAILURE, error } }
}


// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}
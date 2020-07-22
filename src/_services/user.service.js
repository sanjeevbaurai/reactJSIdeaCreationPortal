//import config from 'config';
import { authHeader } from '../_helpers';
import userlist  from '../data/UsersInfo';
import axios from 'axios';

const apiUrl="https://valuecreation-api.herokuapp.com/";

export const userService = {
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
    requestForAccountAccess, 
   // notifications,
  //  accountMappings, 
    fetchAccountRequestNotification, 
    managerApprovalForAccountAccess, 
    getUserList, 
    getUserInfo,
    addUserRole
};

function login(loginId, password) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loginId, password })
    };

    return fetch(apiUrl+'userLogin', requestOptions)
        .then(handleResponse)
        .then(user => {
            console.log(user)
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(user){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(apiUrl+'userSignUp', requestOptions).then(handleResponse);
}

function getAllUsers() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    return fetch(apiUrl+'users', requestOptions).then(handleResponse);
}

function changePassword(userLogin,oldPassword,password){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userLogin,password)
    };
    return fetch(apiUrl+'changePassword/oldPassword='+oldPassword, requestOptions).then(handleResponse);
}

function forgotPasword(user){
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(apiUrl+'forgotPasword', requestOptions).then(handleResponse);
}

 function getQuestionList() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(apiUrl+'securityQuestions', requestOptions).then(handleResponse);
}

 function getAccountList() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(apiUrl+'account', requestOptions).then(handleResponse);
}

 function getIdeaTheme(accountId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(apiUrl+'ideaTheme?accountId='+accountId, requestOptions).then(handleResponse);
}

    function getIdeaClassification(){
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };

    return fetch(apiUrl+'ideaClassification', requestOptions).then(handleResponse);
    }

    function getIdeaLocation(){
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };

    return fetch(apiUrl+'location', requestOptions).then(handleResponse);
    }

    
    function getIdeaFor(){
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };

    return fetch(apiUrl+'ideaFor', requestOptions).then(handleResponse);
    }

    
    function getAdditionalClassification() {
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };

    return fetch(apiUrl+'addIdeaClassification', requestOptions).then(handleResponse);
    }

    function getIdeaStatus(role){
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };
    return fetch(apiUrl+'ideaStatus?role='+role, requestOptions).then(handleResponse);
    }

    function fetchIdeasforApproval(role,account,section){
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };

        let url= '';
        if(role ==='Admin'){
            url = apiUrl+'getIdeaMyApprovalStatusTracking?section='+section+'&role='+role;
        }else if(role=='manager'){
            url =apiUrl+'getIdeaMyApprovalStatusTracking?account='+account+'&section='+section+'&role='+role;
        }
        return fetch(url, requestOptions).then(handleResponse);
    }

    
    function fetchIdeasforTracking(role,account,section){
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };

        let url= '';
        if(role ==='Admin'){
            url = apiUrl+'getIdeaMyApprovalStatusTracking?section='+section+'&role='+role;
        }else if(role=='manager'){
            url =apiUrl+'getIdeaMyApprovalStatusTracking?account='+account+'&section='+section+'&role='+role;
        }
        return fetch(url, requestOptions).then(handleResponse);
    }

    
    function fetchSubmittedIdea(userId,ideaStatus) {
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };
     return fetch(apiUrl+'getIdea/'+userId+"/"+ideaStatus+"/0/40", requestOptions).then(handleResponse);
    }
    
    function fetchSavedIdea(userId,ideaStatus) {
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };
      return fetch(apiUrl+'getIdea/'+userId+"/"+ideaStatus+"/0/40", requestOptions).then(handleResponse);
    }

    
    // function fetchAllIdeas(pageNumber,numberOfData){
    //     const requestOptions = {
    //         method: 'GET',
    //         headers: authHeader()
    //     };
    //  //return fetch(apiUrl+'getIdeaForSearch?titleCommonKey='+title+'&status='+status+'&ideaClassification='+ideaClassification+'&account='+account+'&startDate=2016-08-15&endDate=2019-8-24&pageNumber='+pageNumber+"&numberOfData="+numberOfData, requestOptions).then(handleResponse);
    //  return fetch(apiUrl+'getIdeaForSearch?pageNumber='+pageNumber+"&numberOfData="+numberOfData, requestOptions).then(handleResponse);
    // }

    function fetchAllIdeas(title,status,ideaClassification,account,startDate,endDate,pageNumber,numberOfData){
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };
        const queryString1=  title?"titleCommonKey="+title+'&':'';
        const queryString2=  status?"status="+status+'&':'';
        const queryString3=  ideaClassification?"ideaClassification="+ideaClassification+'&':'';
        const queryString4=  account?"account="+account+'&':'';
        const queryString5=  startDate?"startDate="+startDate+'&':'';
        const queryString6=  endDate?"endDate="+endDate+'&':'';
        const queryString=queryString1+queryString2+queryString3+queryString4+queryString5+queryString6
        console.log("queryString>>",queryString1)
        return fetch(apiUrl+'getIdeaForSearch?'+queryString+'&pageNumber='+pageNumber+"&numberOfData="+numberOfData, requestOptions).then(handleResponse);
     // return fetch(apiUrl+'getIdeaForSearch?pageNumber='+pageNumber+"&numberOfData="+numberOfData, requestOptions).then(handleResponse);
    }

    function addAccount(accountName){
        const requestOptions = {
            method: 'POST',
            headers: authHeader()
        };
      return fetch(apiUrl+'addAccount?account='+accountName, requestOptions).then(handleResponse);
    }

    function deleteAccount(accountName){
        const requestOptions = {
            method: 'POST',
            headers: authHeader()
        };
      return fetch(apiUrl+'deleteAccount?account='+accountName, requestOptions).then(handleResponse);
    }
    function requestForAccountAccess(userId, accountId, reason){
        const requestOptions = {
            method: 'POST',
            headers: authHeader()
        };
      return fetch(apiUrl+'requestForAccountAccess?userId='+userId+'&accountId='+accountId+"&reason="+reason, requestOptions).then(handleResponse);
    }   
    
 
    function fetchAccountRequestNotification(userId){
        const requestOptions = {
            method: 'POST',
            headers: authHeader()
        };
      return fetch(apiUrl+'getAccountRequestNotification?userId='+userId, requestOptions).then(handleResponse);
    }

    function managerApprovalForAccountAccess(recordId, userId, accountId){
        const requestOptions = {
            method: 'POST',
            headers: authHeader()
        };
      return fetch(apiUrl+'managerApprovalForAccountAccess?recordId='+recordId+'&userId='+userId+'&accountId='+accountId, requestOptions).then(handleResponse);
    }
    function getUserList(recordId){
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };
      return fetch(apiUrl+'getUserList?recordId='+recordId, requestOptions).then(handleResponse);
    }
    function getUserInfo(userRecordId){
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };
      return fetch(apiUrl+'getUserInfo?userRecordId='+userRecordId, requestOptions).then(handleResponse);
    }
    function addUserRole(userId, accountId, roleId){
        const requestOptions = {
            method: 'POST',
            headers: authHeader()
        };
      return fetch(apiUrl+'addUserRole?userId='+userId+'&accountId='+accountId+"&roleId="+roleId, requestOptions).then(handleResponse);
    }

/*
function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}
*/
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                //eslint-disable-next-line
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
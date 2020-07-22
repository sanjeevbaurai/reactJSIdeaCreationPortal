import axios from 'axios';
import { stat } from 'fs';
import {
    withRouter
  } from 'react-router-dom'

const apiUrl="https://valuecreation-api.herokuapp.com"; 
const api = {
    ideas: 'getIdea',
    ideaClassification:'ideaClassification',
    account:'account',
    ideaFor:'ideaFor',
    addIdeaClassification: 'addIdeaClassification',
    location:'location',
    ideaTheme:'ideaTheme',
    saveSubmitIdea: 'saveIdeaDetails',
    saveSubmitAttachment: 'saveIdeaDetailsMultipart',
    updateIdea:'updateIdeaDetails',
    allIdeas:"getIdeaForSearch",
    approval_tracking:"getIdeaMyApprovalStatusTracking",
    apiIdeaStatus:"ideaStatus",
    addAccountApi:"addAccount",
    deleteAccountApi:"deleteAccount"
}

const user = JSON.parse(localStorage.getItem('user'));
class IdeaService {

    fetchIdeas = async (val) => {
        this.cancelTokenSource = axios.CancelToken.source();
        try {
            const response = await axios.get(apiUrl+'/'+api.ideas+"/"+user.userId+"/"+val+"/0/40", {
           // const response = await axios.get(api.ideas, {    
                CancelToken: this.cancelTokenSource.token
            });
            return { ideas: response.data, error: null, loading: false }
        } catch (err) {
            if (axios.isCancel(err)) {
            } else {
                return { ideas: null, error: err, loading: false }
            }
        } finally {
            this.cancelTokenSource = null;
        }
    }

    
fetchIdeaClassification = async (val) => {
    this.cancelTokenSource = axios.CancelToken.source();

    try {
        const response = await axios.get(apiUrl+'/'+api.ideaClassification, {
       // const response = await axios.get(apiUrl+'/'+api.ideas, {    
            CancelToken: this.cancelTokenSource.token
        });
        return { classificationList: response.data, error: null, loading: false }
    } catch (err) {
        if (axios.isCancel(err)) {
        } else {
            return { classificationList: null, error: err, loading: false }
        }
    } finally {
        this.cancelTokenSource = null;
    }
}
fetchAccount = async (val) => {
    this.cancelTokenSource = axios.CancelToken.source();

    try {
        const response = await axios.get(apiUrl+'/'+api.account, {
       // const response = await axios.get(apiUrl+'/'+api.ideas, {    
            CancelToken: this.cancelTokenSource.token
        });
        return { accountList: response.data, error: null, loading: false }
    } catch (err) {
        if (axios.isCancel(err)) {
        } else {
            return { accountList: null, error: err, loading: false }
        }
    } finally {
        this.cancelTokenSource = null;
    }
}
fetchIdeaFor= async (val) => {
    this.cancelTokenSource = axios.CancelToken.source();

    try {
        const response = await axios.get(apiUrl+'/'+api.ideaFor, {
       // const response = await axios.get(apiUrl+'/'+api.ideas, {    
            CancelToken: this.cancelTokenSource.token
        });
        return { ideaFor: response.data, error: null, loading: false }
    } catch (err) {
        if (axios.isCancel(err)) {
        } else {
            return { ideaFor: null, error: err, loading: false }
        }
    } finally {
        this.cancelTokenSource = null;
    }
}
fetchAddIdeaClassification = async (val) => {
    this.cancelTokenSource = axios.CancelToken.source();

    try {
        const response = await axios.get(apiUrl+'/'+api.addIdeaClassification, {
       // const response = await axios.get(apiUrl+'/'+api.ideas, {    
            CancelToken: this.cancelTokenSource.token
        });
        return { addClassification: response.data, error: null, loading: false }
    } catch (err) {
        if (axios.isCancel(err)) {
        } else {
            return { addClassification: null, error: err, loading: false }
        }
    } finally {
        this.cancelTokenSource = null;
    }
}
fetchLocation= async (val) => {
    this.cancelTokenSource = axios.CancelToken.source();

    try {
        const response = await axios.get(apiUrl+'/'+api.location, {
       // const response = await axios.get(apiUrl+'/'+api.ideas, {    
            CancelToken: this.cancelTokenSource.token
        });
        return { location: response.data, error: null, loading: false }
    } catch (err) {
        if (axios.isCancel(err)) {
        } else {
            return { location: null, error: err, loading: false }
        }
    } finally {
        this.cancelTokenSource = null;
    }
}


 fetchIdeaTheme= async (val) => {
        this.cancelTokenSource = axios.CancelToken.source();

        try {
            const response = await axios.get(apiUrl+'/'+api.ideaTheme, {
        // const response = await axios.get(apiUrl+'/'+api.ideas, {    
                CancelToken: this.cancelTokenSource.token
            });
            return { ideaTheme: response.data, error: null, loading: false }
        } catch (err) {
            if (axios.isCancel(err)) {
            } else {
                return { ideaTheme: null, error: err, loading: false }
            }
        } finally {
            this.cancelTokenSource = null;
        }
    }
// save or submit idea with attachment

    UploadIdea = (event, submitStatus, file) => {
        event.preventDefault();
        let user = JSON.parse(localStorage.getItem('user'));
        const data = new FormData(event.target);
        
        data.append("attachment", file);
        const headers = new Headers();
          //  headers.append('Content-Type', 'multipart/form-data');
     
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            headers.append('authorization',user.token);
       
    
        const options = {
            method: 'POST',
            headers,
            body:{
            "jsonString": JSON.stringify({
                        title: data.get('title'),
                        classification: data.get('classification'),
                        account: data.get('accountName'),
                        hardwareReq: data.get('hardwareReq'),
                        softwareReq: data.get('softwareReq'),
                        problem: data.get('problem'),
                        solution: data.get('solution'),
                        benefit: data.get('benefit'),
                        detailedDesc: data.get('detailedDesc'),
                        userId: user.userId,
                        status: submitStatus,
                        ideaFor: data.get('ideaFor'),
                        accSpecific: data.get('accSpecific'),
                        location: data.get('location'),
                        theme: data.get('theme'),
                        costBenefitDone: data.get('costBenefitDone'),
                        submittedBy:user.firstName,
                        idea_Status:"NEW",                  
                    }),
                },
                }
   
     const url = apiUrl+'/'+api.saveSubmitAttachment;
  console.log("save submit idea with attachment")
     const  request = new Request(url,options,data);
   fetch(request)
   // axios.post(url,options,data,headers)
    .then(response => {
        if (response.status === 200){
        alert ("Saved the details successfully");
        } else {
            alert ("Unable the save the details, please verify the details and retry");
        }
        return response.json();
        }).then(jsonResponse => {
            console.log(jsonResponse);
            alert ("Unable the save the details, please verify the details and retry");
        }).catch (error => {
            console.log(error)
        });
    }
// save or submit idea without file attachment
    postIdea = (event, ideaStatus,userId, fName) => {
        event.preventDefault();
        let user = JSON.parse(localStorage.getItem('user'));
        const data = new FormData(event.target);
        const headers = new Headers();
        let idea_Status='';

            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            headers.append('authorization',user.token);
            if (ideaStatus=="SAVE")
                {
                    idea_Status="Draft";
                }
                else{
                    idea_Status="Submitted";
                }
        const options = {
                method: 'POST',
                headers,
                body: JSON.stringify({    
                        title: data.get('title'),
                        classification: data.get('classification'),
                        account: data.get('accountName'),
                        hardwareReq: data.get('hardwareReq'),
                        softwareReq: data.get('softwareReq'),
                        problem: data.get('problem'),
                        solution: data.get('solution'),
                        benefit: data.get('benefit'),
                        detailedDesc: data.get('detailedDesc'),
                        userId: userId,//user.userId,//"1234",//data.get('userId'),
                        status: ideaStatus,
                        idea_Status:idea_Status,
                        attachment: null,
                        ideaFor: data.get('ideaFor'),
                        accSpecific: data.get('accSpecific'),
                        location: data.get('location'),
                        theme: data.get('theme'),
                        costBenefitDone: data.get('costBenefitDone'),
                        submittedBy:fName//user.firstName                       
                }),  
        };
    
  
   const  request = new Request(apiUrl+'/'+api.saveSubmitIdea,options);
   console.log("save submit idea without attachment")
    fetch(request)
    .then(response => {
        if (response.status === 200){
            if(ideaStatus !=="SUBMIT"){
              alert ("Saved the details successfully");
            } else{
                alert ("Idea submitted successfully");
            }
        } else {
            alert ("Unable the save the details, please verify the details and retry");
        }
        return response.json();
        }).then(jsonResponse => {
            console.log(jsonResponse);
        }).catch (error => {
            console.log(error)
        });
    }
// update saved idea from myQueue->Save Idea
    updateIdeaDetails = (event, recordid, ideaStatus) => {
        console.log(ideaStatus)
        event.preventDefault();
        let user = JSON.parse(localStorage.getItem('user'));
        
        let idea_Status='';
        if(ideaStatus=="SAVE")
        {
            idea_Status="Draft";
        }
        else{
            idea_Status="Submitted";
        }
        const data = new FormData(event.target);
       
       // const recordid=data.get('recordid');
        const updatedData ={
                title: data.get('title'),
                classification: data.get('classification'),
                account: data.get('accountName'),
                hardwareReq: data.get('hardwareReq'),
                softwareReq: data.get('softwareReq'),
                problem: data.get('problem'),
                solution: data.get('solution'),
                benefit: data.get('benefit'),
                detailedDesc: data.get('detailedDesc'),
                userId: user.userId,//"1234",//data.get('userId'),
                status: ideaStatus,
                idea_Status:idea_Status,
                attachment: null,
                ideaFor: data.get('ideaFor'),
                accSpecific: data.get('accSpecific'),
                location: data.get('location'),
                theme: data.get('theme'),
                costBenefitDone: data.get('costBenefitDone'),
                submittedBy:user.firstName
       }
        const updatedUrl=apiUrl+'/'+api.updateIdea+"?recordId="+recordid+"&status="+ideaStatus;
        
        fetch(updatedUrl, {
                    method: 'PUT',
                    body: JSON.stringify(updatedData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
         }).then(response => {
                    if (response.status === 200){
                        if(ideaStatus !=="SUBMIT"){
                          alert ("Saved the details successfully");
                        } else{
                            alert ("Idea submitted successfully");
                        }
                    } else {
                        alert ("Unable the save the details, please verify the details and retry");
                    }
                    //return response.json();
                  return { status: response.status, error: null, loading: false }
         }).then(jsonResponse => {
                        console.log(jsonResponse);
                    }).catch (error => {
                        console.log(error)
                    });
        }   

        updateIdeaStatus = (recordid, ideaStatus) => {
            console.log(ideaStatus)
            let user = JSON.parse(localStorage.getItem('user'));
            const updatedData ={
                    idea_Status:ideaStatus
           }
            const updatedUrl=apiUrl+'/'+api.updateIdea+"?recordId="+recordid;
            
            fetch(updatedUrl, {
                        method: 'PUT',
                        body: JSON.stringify(updatedData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
             }).then(response => {
                        if (response.status === 200){
                            if(ideaStatus !=="SUBMIT"){
                                alert ("Idea status updated successfully");
                            }
                        } else {
                            alert ("Unable the update idea status, please verify the details and retry");
                        }
                        //return response.json();
                      return { status: response.status, error: null, loading: false }
             }).then(jsonResponse => {
                            console.log(jsonResponse);
                        }).catch (error => {
                            console.log(error)
                        });
            }   

    fetchAllIdeas= async () => {
        this.cancelTokenSource = axios.CancelToken.source();

        try {
            const response = await axios.get(apiUrl+'/'+api.allIdeas+'?pageNumber=0&numberOfData=1000', {
        // const response = await axios.get(apiUrl+'/'+api.ideas, {    
                CancelToken: this.cancelTokenSource.token
            });
            return { allIdeas: response.data, error: null, loading: false }
        } catch (err) {
            if (axios.isCancel(err)) {
            } else {
                return { allIdeas: null, error: err, loading: false }
            }
        } finally {
            this.cancelTokenSource = null;
        }
    }

    fetchIdeaApprovalTracking= async (role,account,section) => {
        this.cancelTokenSource = axios.CancelToken.source();
        let url= '';
        if(role=='admin'){
            url = apiUrl+'/'+api.approval_tracking+'?section='+section+'&role='+role;
        }else if(role=='manager'){
            url =apiUrl+'/'+api.approval_tracking+'?account='+account+'&section='+section+'&role='+role;
        }
     
        try {
            const response = await axios.get(url, { 
                CancelToken: this.cancelTokenSource.token
            });
            return { ideas: response.data, error: null, loading: false }
        } catch (err) {
            if (axios.isCancel(err)) {
            } else {
                return { ideas: [], error: err, loading: false }
            }
        } finally {
            this.cancelTokenSource = null;
        }
    }


    fetchIdeaStatus= async (role) => {
        this.cancelTokenSource = axios.CancelToken.source();
        console.log(role)
        let urlwithParam=apiUrl+'/'+api.apiIdeaStatus;
        if(role !=="admin"){
            urlwithParam +="?role="+role;
        }
        else{
           // urlwithParam
        }
        try {
            const response = await axios.get(urlwithParam, {
        // const response = await axios.get(apiUrl+'/'+api.ideas, {    
                CancelToken: this.cancelTokenSource.token
            });
            return { ideaStatusList: response.data, error: null, loading: false }
        } catch (err) {
            if (axios.isCancel(err)) {
            } else {
                return { ideaStatusList: null, error: err, loading: false }
            }
        } finally {
            this.cancelTokenSource = null;
        }
    }

    addAccount = (accountName) => {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
             const options = {
                method: 'POST',
                headers
                // body: JSON.stringify({ 
                //         account: accountName               
                // }),  
        };
        let addAccountUrl=apiUrl+'/'+api.addAccountApi+"?account="+accountName;
        const  request = new Request(addAccountUrl,options);
            fetch(request)
            .then(response => {
                console.log(response)
                if (response.status === 200){
                    alert ("Account is added successfully");     
                } 
                return response.json();
                }).then(jsonResponse => {
                    console.log(jsonResponse);
                }).catch (error => {
                    console.log(error)
                });
    }

    deleteAccount = (accountName) => {

        const updatedData ={
                account: accountName
             }
        const updatedUrl=apiUrl+'/'+api.deleteAccountApi+"?account="+accountName;
      //  let addAccountUrl=apiUrl+'/'+api.addAccountApi+"?account="+accountName;  
        fetch(updatedUrl, {
                    method: 'PUT',
                    body: JSON.stringify(updatedData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
         }).then(response => {
             console.log(response)
                    if (response.status === 200){     
                            alert ("Account is deleted successfully");
                        
                    } else {
                        alert ("Unable the delete the account, please verify the details and retry");
                    }
                    //return response.json();
                  return { status: response.status, error: null, loading: false }
         }).then(jsonResponse => {
                        console.log(jsonResponse);
                    }).catch (error => {
                        console.log(error)
                    });
        }   
}

export default IdeaService;
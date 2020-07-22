import React , { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../assets/css/SubmitIdeaForm.css';
import IdeaService from '../Services/Idea.service';
import  UserService  from '../Services/user.service';
import MyQueue from '../views/MyQueue';
import { Redirect } from 'react-router';

const ideaService = new IdeaService()

const userService = new UserService();

class ApprovedIdeaForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
                plannedStartDate: '',
                plannedEndDate: '',
                implementationStartDate: '',
                implementationEndDate: '',
                response:null,
                redirect: false,
                result:false,
                ideaStatusList:[],
                recordid:this.props.idea.recordid,
                idea_Status:this.props.idea.idea_Status
        }
       
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
      //  this.handleButtonClick = this.handleButtonClick.bind(this)
       // this.handleUpload = this.handleUpload.bind(this)

    }
    

    getCorrectDateFormat = () => {
        const date = new Date();

        let dd = date.getDate();
        let mm = date.getMonth() + 1; //January is 0!
        const yyyy = date.getFullYear();

        if (dd < 10) {
        dd = '0' + dd;
        } 
        if (mm < 10) {
        mm = '0' + mm;
        } 

        const today = yyyy + '-' + mm + '-' + dd;
        return today;
    }
    componentWillMount = () => {
        const userRole= userService.getUserDetail().role;
        setTimeout(() => {
                this.getIdeaStatus(userRole);
            }, 500);
        }
    componentWillUnmount = () => {
        this.cancelTokenSource && this.cancelTokenSource.cancel()
    }
    
    
    getIdeaStatus =(userRole)=>{
        setTimeout(() => {
            ideaService.fetchIdeaStatus(userRole)
                        .then(value => {
                            this.setState({ideaStatusList: value.ideaStatusList, error: value.error, loading: value.loading })
                                        })  
                        },500); 
        console.log(this.state.ideaStatusList)

    }

    handleChange = (e) => {
        const el = e.target;
        this.setState({ [el.name]: el.value })
    }
    handleSelectBox = (e) => {
		//const name = e.target.name;
		//this.setState({ [name]: e.target.value, isValid: isFormValid });
        const { name, value } = e.target;
        this.setState({
                [name]: value
        });
	}

    handleButtonClick = (e) => {
        const btname = e.target.name;
		// if (btname === 'Cancel') {
		// 	if (window.confirm('Press ok to clear the form')) {
		// 		this.refs.form.reset();
		// 		return;
		// 	}
		// }
		this.setState({ ideaStatus: btname });
	}
    handleFormSubmit = (event) => {
        event.preventDefault();
       const {recordid, idea_Status} = this.state;
		if (idea_Status==="SAVE") {
            let response="";
            setTimeout(() => {
                response=  ideaService.updateIdeaStatus(recordid, idea_Status)  
                },250);
                
                    console.log(response)
                    this.setState({redirect:true});
                //fetch the updated saved ideas list
                
            }
        }
           // Redirect to={{ pathname: '/MyQueue', state: { from: props.location } }} />

          
    
   
    render() {
        const idea = this.props.idea;
        const recordid= idea.recordid;
        console.log(recordid)
        const userName=JSON.parse(localStorage.getItem('user'));
        const {  loading,redirect, ideaStatusList}= this.state;
       
        if (redirect) {
            //  return <Redirect push to="/MyQueue" />;
            return (<Redirect to={{
                pathname: '/MyQueue',
                state: { referrer: 'redirectFromSavedPage'}
            }} />)
          }
        return (
            <form onSubmit={this.handleFormSubmit} ref="form">
                <ul>
                    <p className="hidden" name="recordid">{recordid}</p>
                    <div className='form-group'>
                        <li className="form-row">
                          <label className="col-2 col-form-label">Title*: </label>
                            <span className="form-control col-4 mt-1">{idea.title} </span>
                       
                            <label className="col-2 col-form-label">Submitted By: </label>
                            {/* <input defaultValue={userName.firstName} name="userName" readOnly/> */}
                            <span className="form-control col-4 mt-1">{idea.submittedBy}</span>
                        </li>
                    <li className="form-row">
                        <label className="col-2 col-form-label">Problem*: </label>
                          <span name="problem" className="form-control col-4 mt-1">{idea.problem}</span> 
                        
                        <label className="col-2 col-form-label">Solution: </label>
                          <span name="solution" className="form-control col-4 mt-1">{idea.solution}</span> 
                    </li>
                    <li className="form-row">
                        <label className="col-2 col-form-label">Benefit: </label>
                      <span name="benefit" className="form-control col-4 mt-1">{idea.benefit}</span>
                    
                        <label className="col-2 col-form-label">Idea Classification: </label>
                    <span name="benefit" className="form-control col-4 mt-1">{idea.classification}</span>
 
                    </li>   
                    
                    <li className="form-row">
                        <label className="col-2 col-form-label">Software Requirements: </label>
                         <span name="softwareReq" className="form-control col-4 mt-1">{idea.softwareReq}</span>
            
                        <label>Hard Requirements: </label>
                         <span name="hardwareReq" className="form-control col-4 mt-1">{idea.hardwareReq}</span>

                    </li>
                        <li className="form-row">  
                             <label className="col-2 col-form-label">Detail Description*: </label>
                            <textarea name="detailedDesc" value={idea.detailedDesc}  className="form-control col-4 detailedDesc" readOnly></textarea>
   
                      
                        <label className="col-2 col-form-label">Account*: </label>
                         <span name="account" className="form-control col-4 mt-1">{idea.account}</span>
                        </li>
                        
                        <li className="form-row">
                        <label className="col-2 col-form-label">Idea for Internal / Client: </label>
                        <span name="ideaFor" className="form-control col-4 mt-1">{idea.ideaFor}</span>
                
                        <label className="col-2 col-form-label">Generic / Account Specific: </label>
                         <span name="accSpecific" className="form-control col-4 mt-1">{idea.accSpecific}</span>
                         </li>
                    <li className="form-row"> 
                        <label className="col-2 col-form-label">Location: </label>
                        {/* <input defaultValue={idea.location} name="location"/> */}
                         <span name="classification" className="form-control col-4 mt-1">{idea.location}</span>
                    
                        <label className="col-2 col-form-label">Idea Theme: </label>
                         <span name="theme" className="form-control col-4 mt-1">{idea.theme}</span>
                         </li>
                    <li className="form-row">
                        {/* <input defaultValue={idea.theme} name="theme"/> */}
                        <label className="col-2 col-form-label">Cost Benefit Done: </label>
                        {/* <input defaultValue={idea.costBenefitDone} name="costBenefitDone"/> */}
                       <span name="costBenefitDone" className="form-control col-4 mt-1">{idea.costBenefitDone}</span> 
          
                  
                        <label className="col-2 col-form-label">File Attachment</label>
                        <span className="col-4"></span>
                        </li>
                    <li className="form-row d-flex justify-content-start">
                      <label className="col-2 col-form-label">Idea Status</label>
                        <select defaultValue={idea.idea_Status} name="idea_Status" className="selectbox col-4" style={{ width: '50%' }} onChange={(e) => {
                                    this.handleSelectBox(e)}//this.handleChange)}
                                }>
                                {ideaStatusList.map((option,i) => {
                                    return (
                                        <option key={i}>{option.statusName}</option>	
                                    )
                                })}
                    </select> 
                   </li>
                   </div>
                   
                    <li className="form-row btnSubmit">
                        <button name="SAVE" title="save" type="submit" className="btn" onClick={this.handleButtonClick}>Update</button>
                        <button name="Cancel" title="cancel" type="submit" className="btn"><Link to="/MyQueue" title="close" >Cancel</Link></button>
                    </li>
                </ul>
                </form>

        );
    }
}
export default ApprovedIdeaForm;
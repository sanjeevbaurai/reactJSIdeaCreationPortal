import React , { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../assets/css/SubmitIdeaForm.css';
import { connect } from 'react-redux';
import IdeaService from '../Services/Idea.service';
import MyQueue from '../views/MyQueue';
import { Redirect } from 'react-router';
import { userActions } from '../_actions';

const ideaService = new IdeaService()

class SubmitIdeaForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
                plannedStartDate: '',
                plannedEndDate: '',
                implementationStartDate: '',
                implementationEndDate: '',
                requiredData:{
                    title: props.idea.title,
                    problem:props.idea.problem,
                    detailedDesc:props.idea.detailedDesc,
                    classification:props.idea.classification,
                    accountName:props.idea.account
                },
                recordid:props.idea.recordid,
                classificationList: [],
                accountList:[],
                title: null,
                detailedDesc: null,
                isValid: null,
                error: null,
                loading: false,
                ideaFor:[],
                addClassification:[],
                location:[],
                ideaTheme:[],
                file:null,
                submitted: false,
                response:null,
                redirect: false,
                result:false
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

    componentDidMount= ()=>{
        const {accounts,idea}=this.props;
			let selectedAccount = accounts.accounts.filter(account => {
				return account.accountName === idea.account;
			});
			this.props.dispatch(userActions.getIdeaTheme(selectedAccount[0].recordid)); 
		console.log(selectedAccount[0])
    }
    componentWillMount = () => {
		
	setTimeout(() => {
		//	this.getIdeaClassification();
//this.getAccountList()
		//	this.getIdeaFor();
		//	this.getAddIdeaClassification();
		//	this.getLocation();
			//this.getIdeaTheme();
          }, 500);
    }
    componentWillUnmount = () => {
        this.cancelTokenSource && this.cancelTokenSource.cancel()
    }
    getIdeaClassification = () => {
		this.setState({ loading: true });
		ideaService.fetchIdeaClassification()
			.then(value => {
                this.setState({ classificationList: value.classificationList, error: value.error, loading: value.loading })
            })
	}
	getAccountList = () => {
		this.setState({ loading: true });
		ideaService.fetchAccount()
			.then(value => {
                this.setState({ accountList: value.accountList, error: value.error, loading: value.loading })
            })
	}
	
	getIdeaFor = () => {
		this.setState({ loading: true });
		ideaService.fetchIdeaFor()
			.then(value => {
                this.setState({ ideaFor: value.ideaFor, error: value.error, loading: value.loading })
            })
	}
	getAddIdeaClassification = () => {
		this.setState({ loading: true });
		ideaService.fetchAddIdeaClassification()
			.then(value => {
                this.setState({ addClassification: value.addClassification, error: value.error, loading: value.loading })
            })
	}
	getLocation = () => {
		this.setState({ loading: true });
		ideaService.fetchLocation()
			.then(value => {
                this.setState({ location: value.location, error: value.error, loading: value.loading })
            })
	}

	getIdeaTheme = () => {
		this.setState({ loading: true });
		ideaService.fetchIdeaTheme()
			.then(value => {
                this.setState({ ideaTheme: value.ideaTheme, error: value.error, loading: value.loading })
            })
    }
    

    handleChange = (e) => {
        const el = e.target;
        this.setState({ [el.name]: el.value })
    }
    handleSelectBox = (e) => {
		//const name = e.target.name;
		//this.setState({ [name]: e.target.value, isValid: isFormValid });
        const { name, value } = e.target;
        const { requiredData } = this.state;
        this.setState({
            requiredData: {
                ...requiredData,
                [name]: value
            }
        });
        const {accounts}=this.props;
        if(name==='accountName'){
			let selectedAccount = accounts.accounts.filter(account => {
				return account.accountName === value;
			});
			this.props.dispatch(userActions.getIdeaTheme(selectedAccount[0].recordid)); 
		}
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
        const { requiredData } = this.state;
        console.log(requiredData)
		this.setState({ submitted: true });
       const {recordid, ideaStatus} = this.state;
       
		if (requiredData.title && requiredData.problem && requiredData.detailedDesc && requiredData.classification  && requiredData.accountName) {
			if(this.state.file ===null){
                let response="";
				if (this.state.ideaStatus !== 'SAVE'){
					if (window.confirm('Idea once submitted you can’t modify the details')) {
						event.preventDefault();
					}
                }
            setTimeout(() => {
                response=  ideaService.updateIdeaDetails(event, recordid, ideaStatus)  
                },250);
                

                    console.log(response)
                    this.setState({redirect:true});
                //fetch the updated saved ideas list
                
            }
           // Redirect to={{ pathname: '/MyQueue', state: { from: props.location } }} />

            // console.log(this.state.response)
            // if (this.state.response=== 200){
            //     this.setState({
            //         redirect: true
            //       })
            // this.setRedirect();   
            // }
			// else{
			// 	if (this.state.ideaStatus === 'SAVE'){
			// 		ideaService.UploadIdea(event, this.state.ideaStatus,this.state.file)
			// 	} else {
			// 		if (window.confirm('Idea once submitted you can’t modify the details')) {
			// 			event.preventDefault();
			// 			ideaService.submitSavedIdea(event, this.state.ideaStatus,this.state.file)
			// 		}
			// 	}
			// }
		}
    }
   
    render() {
        const idea = this.props.idea;
        const recordid= idea.recordid;
        const {user, ideaTheme, addClassification,accounts,ideaClassification,locations,ideaFor}= this.props;
        const userName= user.fName;
        const { classificationList, accountList, requiredData, submitted, loading, redirect}= this.state;
       console.log(addClassification)
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
                    <div className={'form-group' + (submitted && !requiredData.title ? ' has-error' : '')}>
                    <li className="form-row">
                        <label>Title*: </label>
                        <input defaultValue={idea.title} name="title" onChange={(e) => {
                                this.handleSelectBox(e)}}/>
                        <label>Submitted By: </label>
                        <input defaultValue={userName} name="userName" readOnly/>
                    </li>
                    {submitted && !requiredData.title &&
                            <div className="help-block">Title field is required</div>
                    }
                    </div>
                    <div className={'form-group' + (submitted && !requiredData.problem ? ' has-error' : '')}>
                    <li className="form-row">
                        <label>Problem*: </label>
                        <textarea defaultValue={this.props.idea.problem} name="problem" maxLength={100} onChange={(e) => {
                                this.handleSelectBox(e)}} />
                  
                        <label>Solution: </label>
                        <textarea defaultValue={idea.solution} name="solution" maxLength={100} onChange={(e) => {
                                this.handleSelectBox(e)}}/>
                    </li>
                    {submitted && !requiredData.problem &&
                            <div className="help-block">Problem field is required</div>
                    }
                    </div>
                    <div className={'form-group' + (submitted && !requiredData.classification ? ' has-error' : '')}>
                    <li className="form-row">
                        <label>Benefit: </label>
                        <textarea defaultValue={idea.benefit} name="benefit" maxLength={100}/>
                        <label>Idea Classification: </label>
                        {/* <input defaultValue={idea.classification} name="classification"/> */}
                        <select defaultValue={idea.classification} name="accountName" className="selectbox" style={{ width: '25%' }} onChange={(e) => {
                                this.handleSelectBox(e)}//this.handleChange)}
                            }>
                            <option disabled> -- select -- </option>
                            {ideaClassification && ideaClassification.ideaClassification &&  ideaClassification.ideaClassification.map((option,i) => {
                                return (
                                    <option key={i}>{option.classificationName}</option>
                                )
                            })}
                        </select>

                    </li>    {submitted && !requiredData.classification &&
                            <div className="help-block">Classification field is required</div>
                    }
                    
                    </div>
                    <div className='form-group'>
                    <li className="form-row">
                        <label>Software Requirements: </label>
                        <input defaultValue={idea.softwareReq}/>
                        <label>Hard Requirements: </label>
                        <input defaultValue={idea.hardwareReq} name="hardwareReq"/>
                    </li>
                   
                    </div>
                    <div className={'form-group' + (submitted && !requiredData.detailedDesc ? ' has-error' : '')}>
                        <li className="form-row">
                            <label>Detail Description*: </label>
                            <textarea defaultValue={idea.detailedDesc} name="detailedDesc" maxLength={1000} onChange={(e) => {
                                this.handleSelectBox(e)}}/>
                        </li>
                        {submitted && !requiredData.detailedDesc &&
                                <div className="help-block">Detailed description field is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !requiredData.accountName ? ' has-error' : '')}>
                    <li className="form-row">
                        <label>Account*: </label>
                        {/* <input defaultValue={idea.account} name="account"/> */}
                        <select defaultValue={idea.account} name="accountName" className="selectbox" style={{ width: '25%' }} onChange={(e) => {
                                this.handleSelectBox(e)}//this.handleChange)}
                            }>
                            <option > -- select -- </option>
                            {accounts && accounts && accounts.accounts.map((option,i) => {
                                return (
                                    <option key={i}>{option.accountName}</option>
                                )
                            })}
                        </select>
                        <label>Idea for Internal / Client: </label>
                        {/* <input defaultValue={idea.ideaFor} name="ideaFor"/> */}
                        <select defaultValue={idea.ideaFor} name="ideaFor" className="selectbox" style={{ width: '25%' }} onChange={(e) => {
                                this.handleSelectBox(e)}//this.handleChange)}
                            }>
                            <option> -- select -- </option>
                            {ideaFor && ideaFor.ideaFor && ideaFor.ideaFor.map((option,i) => {
                                return (
                                    <option key={i}>{option.ideaForName}</option>
                                )
                            })}
                        </select>
                        {submitted && !requiredData.accountName &&
                                <div className="help-block">Account field is required</div>
                        }
                    </li>
                    </div>
                    <div className='form-group'>
                    <li className="form-row">
                        <label>Generic / Account Specific: </label>
                        {/* <input defaultValue={idea.accSpecific} name="accSpecific"/> */}
                        <select defaultValue={idea.accSpecific } name="accSpecific" className="selectbox" style={{ width: '25%' }} onChange={(e) => {
                                this.handleSelectBox(e)}//this.handleChange)}
                            }>  
                            <option > -- select -- </option>
                            {addClassification && addClassification.addClassification && addClassification.addClassification.map((option,i) => {
                            return (
                                <option key={i}>{option.addIdeaClassificationName}</option>
                            )
                        })}
                        </select>
                        <label>Location: </label>
                        {/* <input defaultValue={idea.location} name="location"/> */}
                        <select defaultValue={idea.location } name="location" className="selectbox" style={{ width: '25%' }} onChange={(e) => {
                                this.handleSelectBox(e)}//this.handleChange)}
                            }>
                            <option > -- select -- </option>
                            {locations.locations && locations.locations.map((option,i) => {
                            return (
                                <option key={i}>{option.locationName}</option>
                            )
                        })}
                        </select>
                    </li>
                    </div>
                    <div className='form-group'>
                    <li className="form-row">
                        <label>Idea Theme: </label>
                        {/* <input defaultValue={idea.theme} name="theme"/> */}
                        <select defaultValue= {idea.theme }  name="theme" className="selectbox" style={{ width: '25%' }} onChange={(e) => {
                                this.handleSelectBox(e)}//this.handleChange)}
                            }>
                            <option disabled> -- select -- </option>
                            {ideaTheme && ideaTheme.ideaTheme && ideaTheme.ideaTheme.map((option,i) => {
                            return (
                                <option key={i}>{option.custSuccessMeasuresName}</option>
                            )
                        })}
                        </select>
                        <label>Cost Benefit Done: </label>
                        {/* <input defaultValue={idea.costBenefitDone} name="costBenefitDone"/> */}
                        <select defaultValue={ idea.costBenefitDone }  name="costBenefitDone" className="selectbox" style={{ width: '25%' }} onChange={(e) => {
                                this.handleSelectBox(e)}//this.handleChange)}
                            }>
                            <option disabled> -- select -- </option>
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                       
                    </li>
                    </div>
                    <div className='form-group'>
                    <li className="form-row">
                        <label>File Attachment</label>
                        <input type="file" name="file"/>
                    </li>
                    </div>
                    <li className="form-row btnSubmit">
                        <button name="SAVE" title="save" type="submit" className="btn" onClick={this.handleButtonClick}>Save</button>
                        <button name="SUBMIT" title="submit" type="submit" className="btn" onClick={this.handleButtonClick}>Submit</button>
                        <button name="Cancel" title="cancel" type="submit" className="btn"><Link to="/MyQueue" title="close" >Cancel</Link></button>
                    </li>
                </ul>
                </form>

        );
    }
}
//export default SubmitIdeaForm;

function mapStateToProps(state) {
    const { authentication,ideaClassification,ideaFor, savedIdeas, submitIdeas, ideaTheme,accounts,addClassification,locations} = state;
    const { user } = authentication;
    return {
        user,
        ideaClassification,
		accounts,
		locations,
		ideaTheme,
		ideaFor,
		addClassification,
        savedIdeas,
        submitIdeas
    };
  }
  
  const connectedSubmitIdeaForm = connect(mapStateToProps)(SubmitIdeaForm);
  export { connectedSubmitIdeaForm as SubmitIdeaForm };
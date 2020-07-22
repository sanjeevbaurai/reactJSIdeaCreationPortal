import React , { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import  UserService  from '../Services/user.service';

const userService = new UserService();

class IdeaDetailsForm extends Component {

    state = {
        plannedStartDate: '',
        plannedEndDate: '',
        implementationStartDate: '',
        implementationEndDate: '',
        redirect:false
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

    handleChange = (e) => {
        const el = e.target;
        this.setState({ [el.name]: el.value })
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
        
        this.setState({redirect:true});
	}

    render() {
        const idea = this.props.idea;
        const redirect= this.state.redirect; 
        const readOnly= idea.idea_Status!=='Review'? true:false;
        const {user}= this.props;
        const userRole= user.role;//userService.getUserDetail().role;
        if (redirect) {
            return <Redirect push to="/MyQueue" />;
          }
        return (
                <form>
                <ul>
                    <li className="form-row">
                        <label>Title: </label>
                        <input defaultValue={idea.title} name="title" maxLength={100} readOnly={readOnly}/>
                        <label>Submitted By: </label>
                        <input defaultValue={idea.submittedBy} name="userId" readOnly/>
                    </li>
                    <li className="form-row">
                        <label>Problem: </label>
                        <textarea defaultValue={idea.problem} name="problem" maxLength={100}  readOnly={readOnly}  />
                        <label>Solution: </label>
                        <textarea defaultValue={idea.solution} name="solution" maxLength={100} readOnly={readOnly}/>
                    </li>
                    <li className="form-row">
                        <label>Benefit: </label>
                        <textarea defaultValue={idea.benefit} name="benefit" maxLength={100} readOnly={readOnly}/>
                        <label>Idea Classification: </label>
                        <input defaultValue={idea.classification} name="classification" readOnly={readOnly}/>
                    </li>
                    
                    <li className="form-row">
                        <label>Software Requirements: </label>
                        <input defaultValue={idea.softwareReq} name="softwareReq" readOnly={readOnly} maxLength={100}/>
                        <label>Hard Requirements: </label>
                        <input defaultValue={idea.hardwareReq} name="hardwareReq" readOnly={readOnly} maxLength={100}/>
                    </li>
                    <li className="form-row">
                        <label>Detail Description: </label>
                        <textarea defaultValue={idea.detailedDesc} name="detailedDesc" maxLength={1000} readOnly={readOnly}/>
                    </li>
                    <li className="form-row">
                        <label>Account: </label>
                        <input defaultValue={idea.account} name="account" readOnly={readOnly}/>
                        <label>Idea for Internal / Client: </label>
                        <input defaultValue={idea.ideaFor} name="ideaFor" readOnly={readOnly}/>
                    </li>
                    <li className="form-row">
                        <label>Generic / Account Specific: </label>
                        <input defaultValue={idea.accSpecific} name="accSpecific" readOnly={readOnly}/>
                        <label>Location: </label>
                        <input defaultValue={idea.location} name="location" readOnly={readOnly}/>
                    </li>
                    <li className="form-row">
                        <label>Idea Theme: </label>
                        <input defaultValue={idea.theme} name="theme" readOnly={readOnly}/>
                        <label>Cost Benefit Done: </label>
                        <input defaultValue={idea.costBenefitDone} name="costBenefitDone" readOnly={readOnly}/>
                    </li>
                    <div>
                        <h1>Additional Info</h1>
                    </div>
                    <li className="form-row">
                        <label>ROI Estimate: </label>
                        <input />
                        <label>Effort Estimate: </label>
                        <input />
                    </li>
                    <li className="form-row">
                        <label>Cost Estimate: </label>
                        <input />
                        <label>Approver Comments: </label>
                        <input />
                    </li>
                    <li className="form-row">
                        <label>Planned Start Date: </label>
                        <input name="plannedStartDate" type="date" min={this.getCorrectDateFormat()} 
                            value={this.state.plannedStartDate} onChange={this.handleChange}/>
                        <label >Planned End Date: </label>
                        <input name="plannedEndDate" type="date" min={this.state.plannedStartDate} onChange={this.handleChange}/>
                    </li>
                    <li className="form-row">
                        <label>Implementation Start Date: </label>
                        <input name="implementationStartDate" type="date" min={this.getCorrectDateFormat()}
                            onChange={this.handleChange}/>
                        <label>Implementation End Date: </label>
                        <input name="implementationEndDate" type="date" min={this.state.implementationStartDate}
                            onChange={this.handleChange}/>
                    </li>
                    <li className="form-row">
                        <label>*Generated On: </label>
                        <input />
                        <label>New Revenue in GBP: </label>
                        <input />
                    </li>              
                    <li className="form-row">
                        <label>Hours Saved (For Client): </label>
                        <input />
                        <label>Savings in GBP (For Client): </label>
                        <input />
                    </li>
                    <li className="form-row">
                        <label>Revenue in GBP : </label>
                        <input />
                        <label>Hours Saved: </label>
                        <input />
                    </li>
                    <li className="form-row">
                        <label>Savings in GBP Hours: </label>
                        <input />
                    </li>
                    <li className="form-row">
                        <label>File Attachment</label>
                        <input type="file" readOnly/>
                    </li>
                    <li className="form-row">
                       {userRole !=="user" || readOnly ? <button title="save" type="submit" className="btn" onClick={this.handleButtonClick}>Save</button>:''}
                        <button title="submit" type="submit" className="btn"><Link to="/MyQueue" title="close" >Cancel</Link></button>
                    </li>
                </ul>
                </form>
        );
    }
}
//export default IdeaDetailsForm; 

function mapStateToProps(state) {
    const { authentication,ideaStatusList,ideaClassification,accounts,allIdeas } = state;
    const { user } = authentication;
    return {
        user,
        ideaStatusList,
        ideaClassification,
        accounts,
        allIdeas
    };
  }
  
  const connectedIdeaDetailsForm = connect(mapStateToProps)(IdeaDetailsForm);
  export { connectedIdeaDetailsForm as IdeaDetailsForm };
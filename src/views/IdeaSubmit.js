import React, {Component} from 'react';
import IdeaClassfication  from '../components/IdeaClassification';
import IdeaDescription from '../components/IdeaDescription';
import AdditionalInfo from '../components/AdditionalInfo';
import IdeaService from '../Services/Idea.service';
import Loader from '../components/Loader';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import  '../assets/css/IdeaSubmit.css';
import { userActions } from '../_actions';

const ideaService = new IdeaService();

class IdeaSubmit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ideaStatus: 'SUBMIT',
			classificationList: [],
			accountList:[], 
			title: null,
			detailedDesc: null,
			isValid: null,
			error: null,
			loading: false,
			ideaFor:[],//[{recordid: 1,ideaForName: "Internal"},{recordid: 2,ideaForName: "Client"}],
			addClassification:[],
			location:[],
			ideaTheme:[],
			file:null,
			requiredData:{
				title:'',
				problem:'',
				detailedDesc:'',
				classification:'',
				accountName:''
			},
			submitted: false,
			redirect: false
		}
			const { dispatch } = this.props;
			this.handleFormSubmit = this.handleFormSubmit.bind(this)
			this.handleUpload = this.handleUpload.bind(this)
			//this.fileUpload = this.fileUpload.bind(this)
		  
	}
	componentWillMount = () => {
		
		this.interval = setTimeout(() => {
		//	this.getIdeaClassification();
			//this.getAccountList()
			//this.getIdeaFor();
		//	this.getAddIdeaClassification();
			//this.getLocation();
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

	getIdeaTheme = (accountId) => {
		this.setState({ loading: true });
		ideaService.fetchIdeaTheme()
			.then(value => {
                this.setState({ ideaTheme: value.ideaTheme, error: value.error, loading: value.loading })
            })
	}
	

	handleFormSubmit = (event) => {
		event.preventDefault();
		this.setState({ submitted: true });
		const {user}= this.props;
		const fName=user.fName;
		const userId= user.recordId;
		const { requiredData } = this.state;
		if (requiredData.title && requiredData.problem && requiredData.detailedDesc && requiredData.classification  && requiredData.accountName) {
			console.log(this.state)
			if(this.state.file ===null){
				if (this.state.ideaStatus === 'SAVE'){
					ideaService.postIdea(event, this.state.ideaStatus,userId, fName);//,this.state.file)
				} else {
					if (window.confirm('Idea once submitted you can’t modify the details')) {
						event.preventDefault();
						ideaService.postIdea(event, this.state.ideaStatus,userId, fName);//, this.state.file)
					}
				}
			}
			else{
				if (this.state.ideaStatus === 'SAVE'){
					ideaService.UploadIdea(event, this.state.ideaStatus,this.state.file)
				} else {
					if (window.confirm('Idea once submitted you can’t modify the details')) {
						event.preventDefault();
						ideaService.UploadIdea(event, this.state.ideaStatus,this.state.file)
					}
				}
			}
			setInterval(()=>{
				this.setState({redirect:true});
			},500)
		}
	}

	handleButtonClick = (e) => {
		const btname = e.target.name;

		if (btname === 'Cancel') {
			if (window.confirm('Press ok to clear the form')) {
				this.refs.form.reset();
				return;
			}
		}

		this.setState({ ideaStatus: btname });
	}

	
	handleSelectBox = (e) => {
		//const name = e.target.name;
		//this.setState({ [name]: e.target.value, isValid: isFormValid });
		const { name, value } = e.target;
		const {accounts}=this.props;
		console.log(accounts)
        const { requiredData } = this.state;
        this.setState({
            requiredData: {
                ...requiredData,
                [name]: value
            }
		});
		if(name==='accountName') {
			let selectedAccount = accounts.accounts.filter(account => {
				return account.accountName === value;
			});
			this.props.dispatch(userActions.getIdeaTheme(selectedAccount[0].recordid)); 
		}
		
		
	}
	handleUpload=(e) => {
		const fileList = [];
		for (let i = 0; i < e.target.files.length; i++) {
			fileList.push(e.target.files[i])
		}
		this.setState({ file: fileList[0] })
		//console.log('fileList', fileList)

    	/*if(e.target.files[0]!=null)
		{
			this.setState({file:e.target.files[0]})
		}*/
	  }	
	
	render() {
		const { accountList, location, requiredData, submitted, loading,redirect}= this.state;
		const {ideaClassification, addClassification,accounts,locations,ideaTheme,ideaFor }= this.props;
		console.log(addClassification)
		if (redirect) {
            return <Redirect push to="/" />;
          }
			return (
				<form onSubmit={this.handleFormSubmit} ref="form">
				{ loading ? <Loader /> :
					<div className="ideaSubmit">
						<div className="header">
							{/* <h2 className="pageTitle">Submit an Idea</h2>  */}
								<div className="Main" >
									<IdeaClassfication handleSelectBox={this.handleSelectBox} classificationList={ideaClassification.ideaClassification} accountList={accounts.accounts}
									  requiredData={requiredData}  submitted={submitted} />
									<IdeaDescription isValid={false}  handleUpload={this.handleUpload} handleSelectBox={this.handleSelectBox} 
									 requiredData={requiredData}  submitted={submitted} />
									<AdditionalInfo ideaFor={ideaFor.ideaFor} addClassification={addClassification.addClassification} location={locations.locations} ideaTheme={ideaTheme.ideaTheme} />
								</div>			
						</div>
						<div className="btnSubmit d-flex justify-content-center">
								<button name="SUBMIT" type="submit" className="btn" onClick={this.handleButtonClick} >Submit</button>
								<button name="SAVE" type="submit" className="btn ml-2" onClick={this.handleButtonClick}>Save</button>
								<button name="Cancel" type="button" className="btn ml-2" onClick={this.handleButtonClick}>Cancel</button>
						</div>
					</div>}
				</form>
			)
	}
}
//export default IdeaSubmit;

function mapStateToProps(state) {
    const { users, authentication, ideaClassification,accounts,locations,ideaTheme,ideaFor,addClassification } = state;
	const { user } = authentication;
	
    return {
        user,
		users,
		ideaClassification,
		accounts,
		locations,
		ideaTheme,
		ideaFor,
		addClassification
    };
}

const connectedIdeaSubmit = connect(mapStateToProps)(IdeaSubmit);
export { connectedIdeaSubmit as IdeaSubmit };
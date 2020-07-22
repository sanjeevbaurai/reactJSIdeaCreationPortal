import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import  '../assets/css/LoginForm.css';
import SecurityQuestions from '../data/SecurityQuestions.json';

import BackgroundSlideshow from 'react-background-slideshow'

import { userActions } from '../_actions';


class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
       
        this.state = {
            user: {
                domain:'UK',
                loginId: '',
                password: '',
                confirm_password:'',
                fName:'',
                lName:'',
                status:'NEW',
                securityQus: '',
                securityAns:''
            },
            submitted: false,
            sequrityQuestionList:[],
            isTestPassed:false,
            isEmailValidate:false,
            SecurityQuestions:SecurityQuestions.SecurityQuestions
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // componentDidMount = () => {
    //     const { dispatch } = this.props;
    //     this.interval = setTimeout(() => {
    //       const sequrityQuestionList=  dispatch(userActions.getQuestionList());
    //       this.setState({ sequrityQuestionList});
    //       }, 500);
    //   }

      componentDidMount() {
        //this.props.dispatch(userActions.getQuestionList());
    }
    //   componentDidUnmount = () => {
    //     this.cancelTokenSource && this.cancelTokenSource.cancel()
    // } 

    getQuestionList = () => {
        const { dispatch } = this.props;
        this.setState({ loading: true });
        // ideaService.fetchAccount()
        //   .then(value => {
        //             this.setState({ sequrityQuestionList: value, error: value.error, loading: value.loading })
        //         })

     //   dispatch(userActions.getQuestionList());
      }

    handleChange(event) {
        const { name, value } = event.target;
        const { user} = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
        console.log(name)
        if(name==="loginId"){
            let last= value.toLowerCase().split('@')[1]==='gmail.com'?true:false;
            this.setState({isEmailValidate: last});
        }
        if(name==="password"){
            let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,15})");
            let isPasswordStrong= strongRegex.test(user.password);
            this.setState({isTestPassed: isPasswordStrong});
        }
    }


    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { user, isTestPassed,isEmailValidate } = this.state;
        const { dispatch } = this.props;
     
        if (user.domain  && user.fName && user.lName && user.loginId && user.password && user.securityQus  && user.securityAns && isTestPassed && isEmailValidate) {
            dispatch(userActions.register(user));
        }
    }
    

    render() {
        const { registering, questions } = this.props;
        const { user, submitted, isTestPassed , isEmailValidate,sequrityQuestionList} = this.state;
       const { SecurityQuestions, value }= this.state;
       console.log(SecurityQuestions)
        return (
            <div className="coverpage" >
                <div className="container-fluid" id="login-container">
                    <div className="row">
                       
                         <div className="col-5" id="registerCard">
                         <div className="card mt-2" >
                         <div className="card-body pt-0">
                        <div className="loginHeader">
                                    <div className="company_logo"></div>
                                   
                             </div>
                             {/* </div>
                         <div className="card-body"> */}
                <form name="form" onSubmit={this.handleSubmit}>
                <div className="row mt-4">
                <div className="col-md-2"></div>
                <div className="d-flex justify-content-start col-md-8 mb-3 mt-5"> 
                    <small>Please sign up with your</small> 
                    <small className="red">&nbsp; Login@gmail.com</small></div> 
                </div>
                      <div className={'form-group row mb-2' + (submitted && !user.fName ? ' has-error' : '')}>
                                        <div className="col-md-3"></div>
                        <label htmlFor="fName" className="col-md-2 col-form-label text-md-right pl-0">First Name </label>
                        <div className="col-md-6 justify-content-end">
                        <input type="text" className="form-control" name="fName" maxLength="20" value={user.fName} onChange={this.handleChange}  placeholder="First Name"/>
                            {submitted && !user.fName &&
                                <div className="help-block">First name is required</div>
                            }
                        </div>
                    </div>
                    <div className={'form-group row mb-2' + (submitted && !user.lName ? ' has-error' : '')}>
                                        <div className="col-md-3"></div>
                        <label htmlFor="lName" className="col-md-2 col-form-label text-md-right pl-0">Last Name</label>
                        <div className="col-md-6 justify-content-end">
                        <input type="text" className="form-control" name="lName" maxLength="20" value={user.lName} onChange={this.handleChange}  placeholder="Last Name"/>
                            {submitted && !user.lName &&
                                <div className="help-block">Last name is required</div>
                            }
                        </div>
                    </div>
                    <div className={'form-group row mb-2' + (submitted && (!user.loginId || !isEmailValidate )? ' has-error' : '')}>
                                        <div className="col-md-3"></div>
                        <label htmlFor="loginId" className="col-md-2 col-form-label text-md-right pl-0">Log In</label>
                        <div className="col-md-6 justify-content-end">
                        <input type="email" className="form-control" name="loginId" maxLength="50" value={user.loginId} onChange={this.handleChange}  placeholder="Email Id"/>
                            {submitted && !user.loginId &&
                                <div className="help-block">Email Id is required</div>
                            }
                             {submitted && user.loginId && !isEmailValidate &&
                                <div className="help-block">Please enter valid email id</div>
                            }
                        </div>
                    </div>
                    <div className={'form-group row mb-2' + (submitted && (!user.password  || !isTestPassed)? ' has-error' : '')}>
                    <div className="col-md-1"></div>
                        <label htmlFor="password" className="col-md-4 col-form-label text-md-right font-weight-bold">Create Password</label>
                        <div className="col-md-6 justify-content-end">
                         <input className="form-control" name="password" type="password"  maxLength="15" placeholder="Password" value={user.password} onChange={this.handleChange} />
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                        {submitted && user.password && !isTestPassed &&
                            <div className="help-block">Password expects atleast 1 small-case letter, 1 Capital letter, 1 digit, 1 special character and the length should be between 8-15 characters. </div>
                        }
                        </div>
                    </div>
                    <div className={'form-group row mb-2' + (submitted &&( !user.confirm_password  || user.confirm_password  !==  user.password) ? ' has-error' : '')}>
                        <label htmlFor="confirm_password" className="col-md-5 col-form-label text-md-right">Confirm Password</label>
                        <div className="col-md-6 justify-content-end">
                        <input className="form-control" name="confirm_password" type="password" maxLength="15" placeholder="Confirm Password"  value={user.confirm_password} onChange={this.handleChange} />
                        {submitted && !user.confirm_password &&
                            <div className="help-block">Confirm Password is required</div>
                        }
                        {submitted &&  user.password && user.confirm_password && user.confirm_password  !==  user.password  &&
                            <div className="help-block">confirm password should match with password</div>
                        }
                        </div>
                    </div>
                    <div className={'form-group row mb-2' + (submitted && !user.securityQus ? ' has-error' : '')}>
                        <label htmlFor="securityQuestion" className="col-md-5 col-form-label text-md-right pl-0">Please choose the security question</label>
                        <div className="col-md-7 justify-content-end">
                        
                                <Fragment>
                                    <select  className="form-control" onChange={this.handleChange} name="securityQus" value={user.securityQus}>
                                    {SecurityQuestions.map(item => (
                                        <option key={item.id} value={item.securityQuestion}>
                                        {item.securityQuestion}
                                        </option>
                                    ))}
                                    </select>
                                </Fragment>
                    
                        {submitted && !user.securityQus &&
                            <div className="help-block">Please choose the security question</div>
                        }
                        </div>
                    </div>
                    <div className={'form-group row mb-2' + (submitted && !user.securityAns ? ' has-error' : '')}>
                        <label htmlFor="securityAnswer" className="col-md-5  col-form-label text-md-right">Please enter your security answer</label>
                        <div className="col-md-6 justify-content-end"><input type="text" className="form-control" name="securityAns" maxLength="15" placeholder="Answer" value={user.securityAns} onChange={this.handleChange} />
                        {submitted && !user.securityAns &&
                            <div className="help-block">Please enter your security answer</div>
                        }
                        </div>
                    </div>
                    <div className="form-group row mt-4">
                    <div className="col-md-6 "></div>
                    <div className="col-md-2  d-flex justify-content-start"> 
                        <button className="btn btn-primary">Sign up</button>
                        {registering && 
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                     </div>   
                     <div className="col-md-2 d-flex justify-content-end"> 
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                    </div>
                </form>
                <div className="form-group row">
                            
                            <label className="col-md-12 col-form-label text-md-left">
                                Access to and use of this Portal is limited to authorized employees.
                            </label>
                      <br/> <br/> <br/> <br/>
                    </div>  
                </div> 
                        </div>
                        </div>
                        <div className="col-3 portalHeader ">
                         <div className="card-title d-flex justify-content-end"><a href="/">Idea Generation Portal </a></div>
                        <div className="d-flex justify-content-end"> <h4 >          ...Generate ideas begin!</h4>
                        </div>
                        </div>
                    </div> 
                </div> 
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
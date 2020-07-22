import React, { Fragment} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


import SecurityQuestions from '../data/SecurityQuestions.json';

import { userActions } from '../_actions';

class ForgetPassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                userLogin: '',
                securityQus: '',
                securityAns:''
            },
            submitted: false,
            SecurityQuestions:SecurityQuestions.SecurityQuestions
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
        console.log(user)
       // user.securityQus
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
            if (user.userLogin && user.securityQus && user.securityAns) {
                dispatch(userActions.forgotPasword(user));
            }
    }

    render() {
        const { resettingPassword  } = this.props;
        const { user, submitted } = this.state;
        const { SecurityQuestions, value }= this.state;
        //console.log(SecurityQuestions);
        return (
            <div className="coverpage">
                <div className="container-fluid">
                    <div className="row">
                    
                     <div className="col-5" id="registerCard">
                         <div className="card mt-2">
                         <div className="card-body pt-0">
                         <div className="loginHeader">
                                    <div className="company_logo"></div>
                                    <h4 className="card-title"></h4>
                             </div>
                        <form name="form" onSubmit={this.handleSubmit}>
                        <div className="d-flex justify-content-start col-md-12 mb-3 mt-5"> 
                        <label className="instruction"> Have you forgotton your password? Please use the below instruction to Reset your password </label> 
                        </div> 
                            
                        {/* <div className={'form-group row mt-4' + (submitted && !user.domain ? ' has-error' : '')}>
                            <div className="col-md-3"></div>
                                            <label htmlFor="domain" className="col-md-2 col-form-label text-md-left pl-0">Domain</label>
                                            <div className="col-md-6 justify-content-end">
                                                <input type="text" className="form-control" name="domain" value={user.domain} onChange={this.handleChange} />
                                                {submitted && !user.domain &&
                                                    <div className="help-block">Domain is required</div>
                                                }
                                            </div>
                            </div> */}
                            <div className={'form-group row' + (submitted && !user.userLogin ? ' has-error' : '')}>
                                                <div className="col-md-3"></div>
                                <label htmlFor="userLogin" className="col-md-2 col-form-label text-md-right pl-0">Log In</label>
                                <div className="col-md-6 justify-content-end">
                                <input type="text" className="form-control" name="userLogin" value={user.userLogin} onChange={this.handleChange}  placeholder="Login Id"/>
                                    {submitted && !user.userLogin &&
                                        <div className="help-block">Login ID is required</div>
                                    }
                                </div>
                            </div>
                            <div className={'form-group row' + (submitted && !user.securityQus ? ' has-error' : '')}>
                                <label htmlFor="securityQus" className="col-md-5 col-form-label text-md-right">Your security question</label>
                                <div className="col-md-7 justify-content-end">
                                        <Fragment>
                                                <select  className="form-control" onChange={this.handleChange} name="securityQus" value={user.securityQus} >
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
                            <div className={'form-group row' + (submitted && !user.securityAns ? ' has-error' : '')}>
                                <label htmlFor="securityAns" className="col-md-5  col-form-label text-md-right">Please enter your security answer</label>
                                <div className="col-md-6 justify-content-end"><input type="text" className="form-control" name="securityAns" value={user.securityAns} onChange={this.handleChange} placeholder="Answer"/>
                                {submitted && !user.securityAns &&
                                    <div className="help-block">Please enter your security answer</div>
                                }
                                </div>
                            </div>
                        
                            <div className="form-group row">
                            <label  className="col-md-5  col-form-label text-md-right justify-content-center instruction">Click here to reset your password</label>
                                    <div className="col-md-2  d-flex justify-content-center"> 
                                    
                                    <button className="btn btn-link">Submit</button>
                                    {resettingPassword && 
                                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                    }</div>
                                    <div className="col-md-2  d-flex justify-content-end"> 
                                    <Link to="/login" className="btn btn-link">Cancel</Link>
                                </div>
                            </div>
                        </form>
                </div> 
                        </div>
                        </div>
                        <div className="col-3 portalHeader ">
                         <div className="card-title d-flex justify-content-end">Idea Generation Portal</div>
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
    const { resettingPassword } = state.registration;
    return {
        resettingPassword
    };
}

const connectedForgetPassword = connect(mapStateToProps)(ForgetPassword);
export { connectedForgetPassword as ForgetPassword };
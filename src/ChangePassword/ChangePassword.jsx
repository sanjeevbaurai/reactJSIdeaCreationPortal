import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                userLogin: '',
                oldPassword: '',
                password:'',
                confirmPassword:''
            },
            submitted: false
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
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.userLogin && user.oldPassword && user.password && user.confirmPassword) {
            dispatch(userActions.changePassword(user.userLogin,user.oldPassword,user.password));
        }
    }

    render() {
        const { changingPassword  } = this.props;
        const { user, submitted } = this.state;
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
                <div className="d-flex justify-content-center mb-2 mt-4 ml-5  pl-4 mt-5"> 
                        <label className="instruction"> Change your password, please follow the below instructions </label> 
                        </div> 
                    
                        {/* <div className={'form-group row mt-4' + (submitted && !user.domain ? ' has-error' : '')}>
                            <div className="col-md-2"></div>
                                            <label htmlFor="domain" className="col-md-3 col-form-label text-md-left pl-0">Domain</label>
                                            <div className="col-md-6 justify-content-end">
                                                <input type="text" className="form-control" name="domain" value={user.domain} onChange={this.handleChange} />
                                                {submitted && !user.domain &&
                                                    <div className="help-block">Domain is required</div>
                                                }
                                            </div>
                            </div> */}
                    <div className={'form-group row' + (submitted && !user.userLogin ? ' has-error' : '')}>
                    <div className="col-md-2"></div>
                        <label htmlFor="userLogin" className="col-md-3 col-form-label text-md-right pl-0">Log In</label>
                        <div className="col-md-6 justify-content-end">
                        <input type="text" className="form-control" name="userLogin" placeholder="Email id" value={user.userLogin} onChange={this.handleChange} />
                        {submitted && !user.userLogin &&
                            <div className="help-block">Username is required</div>
                        }
                        </div>
                    </div>
                    <div className={'form-group row  ' + (submitted && !user.oldPassword ? ' has-error' : '')}>
                    <div className="col-md-2"></div>
                        <label htmlFor="oldPassword" className="col-md-3 col-form-label text-md-right pl-0">Current Password</label>
                   
                        <div className="col-md-6 justify-content-end">
                        <input type="password" className="form-control" placeholder="Password"  name="oldPassword" value={user.oldPassword} onChange={this.handleChange} />
                        {submitted && !user.oldPassword &&
                            <div className="help-block">Current Password is required</div>
                        }
                        </div>
                    </div>
                    <div className={'form-group row' + (submitted && !user.password ? ' has-error' : '')}>
                    <div className="col-md-2"></div>
                        <label htmlFor="password" className="col-md-3 col-form-label text-md-right pl-0 font-weight-bold">Create Password</label>
                        <div className="col-md-6 justify-content-end">
                        <input type="password" className="form-control" placeholder="New Password" name="password" value={user.password} onChange={this.handleChange} />
                        {submitted && !user.password &&
                            <div className="help-block">New Password is required</div>
                        }
                        </div>
                    </div>
                    <div className={'form-group row' + (submitted && !user.confirmPassword ? ' has-error' : '')}>
                    <div className="col-md-2"></div>
                        <label htmlFor="confirmPassword" className="col-md-3 col-form-label text-md-right pl-0">Confirm Password</label>
                        <div className="col-md-6 justify-content-end">
                        <input type="password" className="form-control" placeholder="Confirm Password" name="confirmPassword" value={user.confirmPassword} onChange={this.handleChange} />
                        {submitted && !user.confirmPassword &&
                            <div className="help-block">confirm Password is required</div>
                        }
                        </div>
                    </div>
                    <div className="form-group row">
                   
                    <label  className="col-md-6 col-form-label text-md-left justify-content-end instruction">Click here to Change your password</label>
                    <div className="col-md-2 d-flex justify-content-start"> 
                    
                        <button className="btn btn-primary">Submit</button>
                        { changingPassword && 
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        </div>
                        <div className="col-md-2 d-flex justify-content-end"> 
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                        </div>
                    </div>
                </form>
                </div> 
               
                </div> 
            </div> 
            <div className="col-3 portalHeader ">
                         <div className="card-title d-flex justify-content-end">Idea Generation Portal</div>
                        <div className="d-flex justify-content-end"> <h4 >          ...Generate the ideas!</h4>
                        </div>
                        </div> 
           </div> 
                </div> 
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { changingPassword } = state.registration;
    return {
        changingPassword
    };
}

const connectedChangePassword = connect(mapStateToProps)(ChangePassword);
export { connectedChangePassword as ChangePassword };
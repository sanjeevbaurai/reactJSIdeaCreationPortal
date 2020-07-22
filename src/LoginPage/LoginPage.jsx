import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import  '../assets/css/LoginForm.css';
import BackgroundSlideshow from 'react-background-slideshow'

import { userActions, alertActions } from '../_actions';

// import image1 from '../assets/images/background-fish.jpg'
// import image2 from '../assets/images/background-flower.jpg'
// import image3 from '../assets/images/background-samurai.jpg'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            domain: 'UK',
            loginId: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { domain, loginId, password } = this.state;
        const { dispatch } = this.props;
        if (domain && loginId && password) {
            dispatch(userActions.login(loginId, password));
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { loginId, password, submitted } = this.state;
        return (
            <div className="coverpage">
           
                <div className="container-fluid" id="login-container">
                    <div className="row">
                        
                         <div className="col-5">
                         <div className="card mt-2">
                         <div className="card-body pt-0">
                            <div className="loginHeader">
                                    <div className="company_logo"></div>
                                    <h4 className="card-title"></h4>
                             </div>
                            <form name="form" onSubmit={this.handleSubmit}>
                           <div className="row mt-4">
                                <div className="d-flex justify-content-start col-md-8  col-sm-8 mb-3 mt-5"> 
                                <small>Please login with your</small> 
                                <small className="red">&nbsp; Login@gmail.com</small></div> 
                             </div>

                                <div className={'form-group row' + (submitted && !loginId ? ' has-error' : '')}>
                                    <label htmlFor="loginId" className="col-md-2 col-form-label text-md-left">Log In</label>
                                    <div className="col-md-6 justify-content-end">
                                        <input type="text" className="form-control" name="loginId" maxLength="50" placeholder="Email id" value={loginId} onChange={this.handleChange} />
                                        {submitted && !loginId &&
                                            <div className="help-block">Login Id is required</div>
                                        }
                                    </div>
                                </div>
                                <div className={'form-group row' + (submitted && !password ? ' has-error' : '')}>
                                    <label htmlFor="password" className="col-md-2 col-form-label text-md-left">Password</label>
                                    <div className="col-md-6 justify-content-end">
                                        <input type="password" className="form-control" name="password" maxLength="15" value={password} onChange={this.handleChange} placeholder="Password"/>
                                        {submitted && !password &&
                                            <div className="help-block">Password is required</div>
                                        }
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-5 d-flex justify-content-end">
                                        <button type="submit" className="btn btn-login" >
                                            Log In
                                        </button>
                                        {loggingIn &&
                                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                    }
                                    </div>
                                    <div className="col-md-4 d-flex  justify-content-start">
                                        <Link to="/register" className="btn btn-link">Sign Up</Link>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-5 d-flex justify-content-end"> 
                                             <Link to="/ForgetPassword" className="btn btn-link">Forget Password </Link>
                                    </div>
                                    <div className="col-md-4  d-flex justify-content-start">         
                            
                                             <Link to="/ChangePassword" className="btn btn-link">Change Password</Link>
                                        </div>
                                   </div>
                            </form>
                            <div className="form-group row">
                            
                                    <label className="col-md-12 col-form-label text-md-left">
                                        Access to and use of this Portal is limited to authorized employees.
                                    </label>
                              
                            </div>          
                        </div> 
                        </div>
                        </div>
                        <div className="col-3 portalHeader  ">
                        <div className="card-title d-flex justify-content-end"><a href="/">Idea Generation Portal </a></div>
                        <div className="d-flex justify-content-end"> <h4 >          ...Generate ideas!</h4>
                        </div>
                        {/* <div className="botchat">
                             <VcfChat />
                        </div> */}
 
                        </div>
                    </div> 
                </div>
                {/* <BackgroundSlideshow images={[ image1, image2, image3 ]}>
                </BackgroundSlideshow> */}
          </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 
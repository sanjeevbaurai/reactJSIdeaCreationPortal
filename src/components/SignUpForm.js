import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class SignUpForm extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          domain:"",
          email: "",
          password: "",
          isAuthenticated:false
        };
    }
    validateForm() {
        return this.state.domain.length > 0 && this.state.email.length > 0 && this.state.password.length > 0;
      }
    
      handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }
    
      handleSubmit = event => {
        event.preventDefault();
        this.setState({
            isAuthenticated:true
        });
      }
    render() {
        return (
            <div className="coverpage">
            <div className="container-fluid">
                {/* <loginForm /> */}
                <div className="row">
                    <div className="col-8">
                    </div>
                <div className="col-4">
                <div className="card">
                    <div className="card-body">

                    <div className="loginHeader">
                        <div className="company_logo"></div>
                            <h4 className="card-title">Idea Generation Portal</h4>
                    </div>
                        <form onSubmit={this.handleSubmit}>
                           <div className="d-flex justify-content-center mb-2 mt-4 ml-5  pl-4"> <small>Please login with your </small> <small className="red">&nbsp; Login@gmail.com</small></div> 
                            <div className="form-group row">
                                <label htmlFor="email_address" className="col-md-3 col-form-label text-md-left">Domain</label>
                                <div className="col-md-9 justify-content-end">
                                    <input type="text" id="domain" className="form-control" name="domain" required  value={this.state.domain} onChange={this.handleChange}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="email_address" className="col-md-3 col-form-label text-md-left">Log In</label>
                                <div className="col-md-9">
                                    <input type="email" id="email" className="form-control" name="email" required value={this.state.email}  onChange={this.handleChange}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="password" className="col-md-3 col-form-label text-md-left">Password</label>
                                <div className="col-md-9">
                                    <input type="password" id="password" className="form-control" name="password" value={this.state.password} required  placeholder="Password" onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                {/* <div className="col-md-8 d-flex justify-content-end">
                                    <button type="submit" className="btn btn-login" disabled={!this.validateForm()}>
                                        Log In
                                    </button>
                                </div> */}
                                 <div className="col-md-4 d-flex  justify-content-start">
                                    <button type="submit" className="btn btn-primary">
                                        Sign Up
                                    </button>
                                </div>
                             </div>
                             {/* <div className="form-group row">
                                <div className="col-md-8  d-flex justify-content-end">  
                                        <button type="submit" className="btn btn-primary">
                                            Forget Password                                
                                        </button>
                                 </div>
                                 <div className="col-md-4  d-flex justify-content-start">         
                                        <button type="submit" className="btn btn-primary">
                                            Change Password
                                        </button>
                                    </div>
                            </div> */}
                     </form> 
                            <div className="ntt-desc row">
                            <div className="col-md-3"></div>
                                <div className="col-md-9">
                                   
                                    <span className="first">  Need Assistance? </span><span>Please contact the Service Desk ITServicedesk@gmail.com</span><br/>
                                    <strong>Enterprise Telephony:</strong><span>8-100-4000</span> <br />
                                    <strong>  Toll Free: </strong><span>xxx xxxx xxx</span>
                              </div>
                            </div>          
                        </div>           
                      </div>
                      </div>
                </div> 
                </div> 
            </div>
        )
    }
}
 export  default SignUpForm;  
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../assets/css/Header.css';

class InactivePage extends React.Component {
    constructor(props)
    {
        super(props);
    this.state={
        showModal:true
    }
}

    
    render() {

        const { showModal } = this.state;
        return (
            <div>
              <div className="App-header">
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-2 d-flex justify-content-start align-items-center flex-column">
                            {/* <a href="google.com" target="_blank">
                                <div className="header-logo"></div>
                                <div className="value-creation"></div>
                            </a>                        */}
                        </div>
                        <div className="headerName col-6 d-flex justify-content-start align-items-center">
                         Idea Generation Portal
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="wrapper" style={{display: showModal ? 'block' : 'none' }} >
                <div className={"modal fade " + (showModal ? 'show' : '')} id="logOutModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{display: showModal ? 'block' : 'none' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="alert alert-danger">
                        Due to inactivity, you have been logged out from Idea Generation Portal. Please login again.
                        </div>
                        <div className="modal-footer">
                                   <Link to="/login" className="btn btn-primary">Ok</Link>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>  
         </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedInactivePage = connect(mapStateToProps)(InactivePage);
export { connectedInactivePage as InactivePage };
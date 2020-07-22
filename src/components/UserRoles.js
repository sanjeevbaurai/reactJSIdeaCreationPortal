import React, { Component } from 'react';

class UserRoles extends Component{
    constructor(){
        super();
        this.state={
            role:'regular_user'
        };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);  
    }
    handleChange(event) {
        this.setState({
          role: event.target.value
        });
      }
      handleSubmit(event) {
        event.preventDefault();
        
       // window.confirm(`Enter reason for access request and click submit`);
      }
  
  render() {
    return (
        <form onSubmit={this.handleSubmit}>
        <ul>
          <li>
            <label>
              <input
                type="checkbox"
                value="regular_user"
                checked={this.state.role === "regular_user"}
                onChange={this.handleChange}
              />
              Regular User
            </label>
          </li>
          
          <li>
            <label>
              <input
                type="checkbox"
                value="manager"
                checked={this.state.role === "manager"}
                onChange={this.handleChange}
              />
              Manager
            </label>
          </li>
  
          <li>
            <label>
              <input
                type="checkbox"
                value="admin"
                checked={this.state.role === "admin"}
                onChange={this.handleChange}
              />
              Admin
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                value="inactive"
                checked={this.state.role === "inactive"}
                onChange={this.handleChange}
              />
              In Active
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                value="Disabled"
                checked={this.state.role === "Disabled"}
                onChange={this.handleChange}
              />
             Disabled
            </label>
          </li>
        </ul>
        <div className="d-flex justify-content-around">
        <button type="submit" className="float-left">Save</button>
        <button type="submit" className="float-right">Cancel</button>
        </div>
      </form>
    );
  };

}
  
export default UserRoles;
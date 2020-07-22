import React, { Component } from 'react';

import data from '../data/IdeaFields.json';
import IdeaService from '../Services/Idea.service';
import  UserService  from '../Services/user.service';

const userService = new UserService();
const ideaService = new IdeaService();

class StatusTracking extends Component {
	constructor(){
				super();
				this.state={
					role: '',
					account: ''
				}
	}


	componentWillMount = () => {
		// const section="StatusTracking";
		// const userRole= userService.getUserDetail().role;
    // const userAccount= userService.getUserDetail().account;
		// ideaService.fetchIdeaApprovalTracking(userRole, userAccount, section)
		// 		.then(value => {
		// 			this.setState({trackingIdeas: value.ideas.content, error: value.error, loading: value.loading })
    //             })     
                 
    }
    componentWillUnmount = () => {
       // this.cancelTokenSource && this.cancelTokenSource.cancel()
    }


		buildRow = (idea, i) => {
      return <tr key={i}>
              <td>{i +1 }</td>
        <td>{idea.title}</td>
        <td>{idea.idea_Status}</td>
        <td>{idea.ideaStatusRAG}</td>
      </tr>
    }

	renderIdeas = (ideas) => {
		return (<table>
			<thead> 
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Idea Status</th>
                <th>Idea Status(RAG)</th>
				</tr>
			</thead>
			<tbody>
		    	{ ideas.map(this.buildRow) }
			</tbody>
		</table>)
	}

	tableToggle = (e) => {
        const tab = e.target.value;
        let state = this.state;
         for (let prop in state) {
             if (prop !== tab) {
                 state[prop] = false
             }
         }
        this.setState({ [tab]: !this.state[tab], active: tab });
    }
  
  render() {
    const { loading }= this.state;
    const { trackingIdeas }= this.props;
    return (
      <div>
        <h2>Status Tracking </h2>
        {
          trackingIdeas  &&  trackingIdeas.length>0 ?
        <div>{ this.renderIdeas(trackingIdeas) } </div>:
        <div className="no-result">
             No result!
          </div>
        }
      </div>
    );
  };

}
  
export default StatusTracking;
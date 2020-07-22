import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import data from '../data/IdeaFields.json';
import IdeaService from '../Services/Idea.service';
import  UserService  from '../Services/user.service';
import Loader from './Loader';
const userService = new UserService();
const ideaService = new IdeaService();

class MyApproval extends Component {
	constructor(){
				super();
				this.state={
					error: null,
					loading: false,
					idea_Status:'',
					currentPage:1,
					itemsPerPage:10,
					ideaStatusList:[],
					userRole:''
				}
				this.handleToUpdate = this.handleToUpdate.bind(this);
				this.handleToSaveChanges= this.handleToSaveChanges.bind(this);
	}


	componentWillMount = () => {
		// const section="MYApproval";
		// const userRole= userService.getUserDetail().role;
		// const userAccount= userService.getUserDetail().account;
		// this.setState({userRole});
		// this.setState({ loading: true });
		// setTimeout(() => {
		// 		ideaService.fetchIdeaApprovalTracking(userRole, userAccount, section)
		// 				.then(value => {
		// 					this.setState({approveIdeas: value.ideas.content, error: value.error, loading: value.loading })
		// 								})  
		// 				},500);  	
		}
	
    componentWillUnmount = () => {
       // this.cancelTokenSource && this.cancelTokenSource.cancel()
    }

		handleToUpdate(event) {
			this.setState({
				 currentPage: Number(event.target.id)
			});
	 }

	 handleToSaveChanges(event){
			console.log(event)
	 }
	buildRow = (idea, i) => {
		let cts =null;
	
			cts = idea.statusChangedDate;
		
	
		const	cdate =	cts.toString().split("-").reverse().join("-");
		return <tr key={i}>
			 <td>{i +1 }</td>
			 <td className="text-left"><Link to={{ pathname: `/MyQueue/ApproveIdea/${i + 1}`, idea }} style={{ textDecoration: 'none' }}>{idea.title}</Link></td>
			 <td className="text-left">{idea.idea_Status}</td>	
			<td>{idea.problem}</td>
			<td>{cdate}</td>
			<td>{idea.implementationPriority}</td>
		</tr>
	}

	handleSelectBox = (e) => {
        const  value  = e.target.value;
        this.setState({
					idea_Status:value
        });
	}

	renderIdeas = (ideas) => {

		const { approveIdeas }= this.props;
		const { currentPage, itemsPerPage}=this.state;
				/* Paginaton starts */
				const indexOfLastItem = currentPage * itemsPerPage;
				const indexOfFirstItem = indexOfLastItem - itemsPerPage;
				const currentItem = approveIdeas.length>0 ? approveIdeas.slice(indexOfFirstItem, indexOfLastItem): [];
			 const pageNumbers = [];
			 for (let i = 1; i <= Math.ceil(approveIdeas.length / itemsPerPage); i++) {
						 pageNumbers.push(i);
			 }
			 const renderPageNumbers = pageNumbers.map(number => {
				return (
					<li
						key={number}
						id={number}
						onClick={this.handleToUpdate} 
						>
						{number}
					</li>
				);
			});

		return (
		<div>
		<table>
			<thead>
				<tr>
					{data.SubmittedIdeas.map((ideaHeader,i) => {
						return (
							<th key={i}>{ideaHeader}</th>
						)
					}
					)}
				</tr>
			</thead>
			<tbody>
			{currentItem.length !==0 && currentItem.map(this.buildRow)} 
			</tbody>
		</table>
			<ul id="page-numbers">
				{pageNumbers.length>1 ? renderPageNumbers: ""}
			</ul></div>
		)
	}

//	tableToggle = (e) => {
    //     const tab = e.target.value;
    //     let state = this.state;
    //      for (let prop in state) {
    //          if (prop !== tab) {
    //              state[prop] = false
    //          }
    //      }
    //     this.setState({ [tab]: !this.state[tab], active: tab });
    // }
  
  render() {

		 const { loading }= this.state;
		 const {approveIdeas} =this.props;
		// console.log("approveIdeas>>",approveIdeas)
    return (
			<div>
				 <h2>My Approval </h2>
				 {/* { loading ? <Loader /> : approveIdeas &&
				<div>
					
						{ this.renderIdeas() }
					</div>
			
				 } */}
				 { loading? <Loader />:
          approveIdeas  &&  approveIdeas.length>0 ?
        <div>{ this.renderIdeas() } </div>:
        <div className="no-result">
             No result!
          </div>
        }
			</div>
    )
  }

}
  
export default MyApproval;
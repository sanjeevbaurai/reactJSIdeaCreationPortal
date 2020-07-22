import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class SubmittedIdeas extends Component { 
	constructor(){
		super()

		this.handleToUpdate = this.handleToUpdate.bind(this);
	 // this.sortBy  = this.sortBy.bind(this);
		this.state={
				ideaFilter:["id","title","status"],
				currentPage:1,
				ideasPerPage:7
		}
}

	buildRow = (idea, i) => {

		const index= this.state.currentPage-1;
		const ideasPerPage= this.state.ideasPerPage;
		let cts =null;
	
			cts = idea.statusChangedDate;
		
	
		const	cdate =	cts.toString().split("-").reverse().join("-");
	//const	cdate = (new Date(cts)).toLocaleDateString();
		return <tr key={i}>
            <td>{ideasPerPage*index+i+1}</td>
			<td className="text-left"><Link to={{ pathname: `/MyQueue/Idea/${i + 1}`, idea }} style={{ textDecoration: 'none' }}>{idea.title}</Link></td>
			<td className="text-center">{idea.idea_Status}</td>
			<td className="text-left">{idea.problem}</td>
			<td className="text-center">{cdate}</td>
			<td>Low</td>	
		</tr>
	}

	handleToUpdate(event) {
		this.setState({
			 currentPage: Number(event.target.id)
		});
 }

	renderIdeas = () => {
		const { submittedIdeas, ideaFields} = this.props;
		const { currentPage, ideasPerPage}=this.state;

				const subIdeas = (submittedIdeas !==null &&  submittedIdeas !== undefined && submittedIdeas.length>0) ? submittedIdeas : [];//.filter(idea => idea.status !== 'Save' && idea.status !== 'save');
					
				/* Paginaton starts */
					const indexOfLastIdea = currentPage * ideasPerPage;
					const indexOfFirstIdea = indexOfLastIdea - ideasPerPage;
					const currentIdea = subIdeas.length>0 ? subIdeas.slice(indexOfFirstIdea, indexOfLastIdea): [];
				 const pageNumbers = [];
				 for (let i = 1; i <= Math.ceil(subIdeas.length / ideasPerPage); i++) {
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
				{currentIdea.length>0 ? <table className="table">
			<thead>
				<tr>
					{ideaFields.map((ideaHeader,i) => {
						return (
							<th key={i}  scope="col">{ideaHeader}</th>
						)
					}
					)}
				</tr>
			</thead>
			<tbody>
			 {currentIdea.map(this.buildRow)}
			</tbody>
		</table>:''}
			<ul id="page-numbers">
                  {pageNumbers.length>1 ? renderPageNumbers: ""}
        </ul> 
		</div>
		)
	}
  
  render() {
    return (
		<div className="tableContainer table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl">
			<h3>Submitted Ideas </h3>
			{ this.renderIdeas() }
		</div>
    );
  };
}
  
export default SubmittedIdeas;
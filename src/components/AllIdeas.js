import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


class AllIdeas extends Component{
    
    constructor(){
        super();
        this.state={
            ideaFilter:["id","title","problem","idea_Status","classification","account","updated"]
        }
    }

    buildRow = (idea, i) => {
		var cts = idea.implementationEndDate ===null?'--' :(new Date(idea.implementationEndDate)).toLocaleDateString();
       // cdate = (new Date(cts)).toLocaleDateString();
        const index= this.props.currentPage-1;
        const ideasPerPage= this.props.ideasPerPage;
		return <tr key={i}>
            <td>{ideasPerPage*index+i+1}</td>
            {/* <th scope="row">{ideasPerPage*index+i+1}</th> */}
			<td className="text-left"><Link to={{ pathname: `/ValueAdds/Idea/${i + 1}`, idea }} style={{ textDecoration: 'none' }}>{idea.title}</Link></td>
			<td className="text-left">{idea.problem}</td>
			<td className="text-left">{idea.idea_Status}</td>
            <td className="text-left">{idea.classification}</td>
            <td className="text-left">{idea.account}</td>
			<td className="text-center">{cts}</td>
		</tr>
    }
    
    renderIdeas = () => {
        const { ideas, ideaFields, currentPage, ideasPerPage} = this.props;
       /* Paginaton starts */
        const indexOfLastIdea = currentPage * ideasPerPage;
        const indexOfFirstIdea = indexOfLastIdea - ideasPerPage;
        const currentIdea = (ideas !==null & ideas !== undefined && ideas.length>0)? ideas.slice(indexOfFirstIdea, indexOfLastIdea):[];
        const allIdeas= (ideas !==null & ideas !== undefined && ideas.length>0) ?ideas :[];
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(allIdeas.length / ideasPerPage); i++) {
          pageNumbers.push(i);
        }

        
        const renderPageNumbers = pageNumbers.map(number => {
            const handleToUpdate  =   this.props.handleToUpdate;
            return (
              <li
                key={number}
                id={number}
                onClick={() => handleToUpdate({number})} 
                >
                {number}
              </li>
            );
          });
        
         
          const renderTableHeader = ideaFields.map((ideaHeader,i) =>{
            const ideaFilter= this.state.ideaFilter[i];
          const sortBy  =   this.props.sortBy;
                return (
                 <th 
                    key={i} 
                    scope="col" 
                    onClick={() => sortBy(ideaFilter)} 
                    >
                    {ideaHeader}
                </th>
                );
            });
          
		return (
            <div>
                {currentIdea.length > 0 &&
                <div>
                <table className="table">
                    <thead>
                        <tr>
                        {renderTableHeader}
                        </tr>
                    </thead>
                    <tbody>
                         {currentIdea.map(this.buildRow)}
                    </tbody>
                </table>
                <ul id="page-numbers">
                  {pageNumbers.length>1 ? renderPageNumbers: ""}
                </ul>  
                </div>
            }
            {currentIdea.length== 0 &&
            <div className="no-result">
                No result!
            </div>
            }    

        </div>
        )
	}
    render() {
        return (
            <div className="tableContainer table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl">
                { this.renderIdeas() }
            </div>
        );
      };
    }

export default AllIdeas
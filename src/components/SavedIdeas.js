import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class SavedIdeas extends Component {

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
        const ideaStatus= 'Draft';
        return <tr key={i}>
            <td className="text-center">{ideasPerPage*index+i+1}</td>
            {/* <td className="text-left"><Link to={{ pathname: `/MyQueue/Idea/${i + 1}`
                }}>{ idea.title }</Link></td> */}
             <td className="text-left"><Link to={{ pathname: `/MyQueue/SavedIdea/${i + 1}`, idea }} style={{ textDecoration: 'none' }}>{idea.title}</Link></td>
            <td className="text-left">{ideaStatus}</td>
        </tr>
    }

    handleToUpdate(event) {
        this.setState({
           currentPage: Number(event.target.id)
        });
     }

      sortBy(key) {
        const { userArray } = this.state;
        let arrayCopy = userArray;
        arrayCopy.sort(this.compareBy(key));
        this.setState({userArray: arrayCopy});
    }

    compareBy=(key)=> {
      return function (a, b) {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      };
    }

    renderIdeas = () => {
        const { ideas, ideaFields } = this.props;
        const { currentPage, ideasPerPage}=this.state;


        //const savedIdeas = ideas;
        const savedIdeas = (ideas !==null &&  ideas !== undefined && ideas.length>0) ? ideas : [];//.filter(idea => idea.status !== 'Save' && idea.status !== 'save');

         /* Paginaton starts */
         const indexOfLastIdea = currentPage * ideasPerPage;
         const indexOfFirstIdea = indexOfLastIdea - ideasPerPage;
         const currentIdea = savedIdeas.length>0 ? savedIdeas.slice(indexOfFirstIdea, indexOfLastIdea): [];

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(savedIdeas.length / ideasPerPage); i++) {
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

        //   const renderTableHeader = ideaFields.map((ideaHeader,i) =>{
        //     const ideaFilter= this.state.ideaFilter[i];
        //   const sortBy  =   this.props.sortBy;
        //         return (
        //          <th 
        //             key={i} 
        //             scope="col" 
        //             onClick={sortBy(ideaFilter)} 
        //             >
        //             {ideaHeader}
        //         </th>
        //         );
        //     });

        return (
         <div><table className="table">
            <thead>
                <tr>
                    {ideaFields.map((ideaHeader,i) => {
                        return (
                            <th key={i} scope="col">{ideaHeader}</th>
                        )
                    }
                    )}
                    {/* {renderTableHeader} */}
                </tr>
            </thead>
            <tbody>
                    {currentIdea.length>0? currentIdea.map(this.buildRow):<tr><td>No record found</td></tr>}	
            </tbody>
        </table>
            <ul id="page-numbers">
                  {pageNumbers.length>1 ? renderPageNumbers: ""}
        </ul>  
        </div>
        )
    }
  
  render() {
    return (
      <div className="tableContainer savedIdeas table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl">
        <h3>Saved Ideas </h3>
        {this.renderIdeas()}
      </div>
    );
  };
}
  
export default SavedIdeas;
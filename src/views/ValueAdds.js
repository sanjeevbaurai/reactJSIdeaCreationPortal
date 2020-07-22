import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import  '../assets/css/valueAdds.css';
import data from '../data/IdeaFields.json';
import Loader from '../components/Loader';
import IdeaService from '../Services/Idea.service';
import AllIdeas from '../components/AllIdeas';
import Idea from '../components/Idea';
import DatePicker from  'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import { userActions, alertActions } from '../_actions';
import { breakStatement } from '@babel/types';

const ideaService = new IdeaService()

class ValueAdds extends Component {
    constructor(props){
        super(props);

        let handleToUpdate  = this.handleToUpdate.bind(this);
        let sortBy  = this.sortBy.bind(this);

      this.state = {
          ideas: [],
          userArray: [],
          status:[],
          idea_classification: [],
          accounts: [],
          year:[ '2017-2018','2018-2019','2019-2020','2020-2021','All'],
          error: null,
          loading: false,
          searchText:"",
          statusFilter:"",
          classificationFilter:"",
          accountFilter:"",
          implementedYearFilter:"",
          currentPage:1,
          ideasPerPage:10,
          status_expanded:false,
          startDate: new Date(),
          endDate: new Date(),
          fromDate:null,
          toDate:null
      }
      const { dispatch } = this.props;
      this.handleStartDateChange = this.handleStartDateChange.bind(this);
      this.handleEndDateChange =  this.handleEndDateChange.bind(this);
    }

    componentDidMount() {
      this.interval = setTimeout(() => {
      const title=this.state.searchText.toLowerCase(),
       status= this.state.statusFilter,
        ideaClassification=this.state.classificationFilter,
        account=this.state.accountFilter,
       
        endDate= this.state.endDate,
        pageNumber=0, numberOfData=20
        let date= new Date();
        date.setMonth(date.getMonth()-1);
        const startDate=date;
        this.setState({
          startDate
        });
        const month=startDate.getMonth()+1;
        const monthEnd=endDate.getMonth()+1;
        const fromDate= startDate.getFullYear()+"-"+month+"-"+startDate.getDate();
        const toDate= endDate.getFullYear()+"-"+monthEnd+"-"+endDate.getDate();
        this.setState({
          fromDate
        });
        this.setState({
          toDate
        });
      this.props.dispatch(userActions.fetchAllIdeas(title,status,ideaClassification,account,fromDate,toDate,pageNumber,numberOfData));
         },500);
   }

    componentWillMount = () => {
		
      this.interval = setTimeout(() => {
       const { allIdeas} = this.props;
       const ideas= (allIdeas && allIdeas.allIdeas  && allIdeas.allIdeas.content) ? allIdeas.allIdeas.content:[];
       this.setState({
        ideas
        })
       const userArray= (allIdeas && allIdeas.allIdeas  && allIdeas.allIdeas.content) ? allIdeas.allIdeas.content:[];
       this.setState({
         userArray
        })
      },250);
    
      
    }
    componentWillUnmount = () => {
      this.cancelTokenSource && this.cancelTokenSource.cancel()
  }
 
    handleToUpdate(val) {
        this.setState({
          currentPage: val.number
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

    filterItems=(val, type) => {
            switch (type) {
                case 'search':
                this.setState({searchText: val});
                break;
                case 'status':
                this.setState({statusFilter: val});
                break;
                case 'classification': 
                this.setState({classificationFilter: val});
                break;
                case 'account':
                this.setState({accountFilter: val});
                break;
                case 'year':
                this.setState({implementedYearFilter: val});
                break;
                default:
            break;
        }
     }


	getIdeas = () => {
		this.setState({ loading: true });
		
		ideaService.fetchAllIdeas()
			.then(value => {
                this.setState({ ideas: value.allIdeas.content, error: value.error, loading: value.loading,loading: value.loading, userArray:value.allIdeas.content })
            })
    }
   
   
    handleStartDateChange(date) {
      const month=date.getMonth()+1;
      const from= date.getFullYear()+"-"+month+"-"+date.getDate();
      console.log(from, this.state.toDate)
      if(from>this.state.toDate){
        alert("Start date should not be greater than end date.")
        let date= new Date();
        date.setMonth(date.getMonth()-1);
        const startDate=date;
        this.setState({
          startDate
        });
        const month=this.state.startDate.getMonth()+1;
        const fromDate=this.state.startDate.getFullYear()+"-"+month+"-"+startDate.getDate();
        this.setState({
          fromDate
        });
        return;
      }
    
      this.setState({
        startDate: date
      });
      this.setState({
        fromDate: from
      });
    }

    handleEndDateChange(date) {

      const month=date.getMonth()+1;
      const toDate= date.getFullYear()+"-"+month+"-"+date.getDate();
      console.log(toDate, this.state.fromDate)
      if(toDate<this.state.fromDate){
        alert("End date should not be less than start date.")
        this.setState({
          endDate: new Date()
        });
        const month=this.state.endDate.getMonth()+1;
        const toDate= this.state.endDate.getFullYear()+"-"+month+"-"+this.state.endDate.getDate();
        this.setState({
          toDate
        });
        return;
      }
      this.setState({
        endDate: date
      });
     
      this.setState({
        toDate
      });

      
      

    }
  
    handleChange=(type, e) =>{
      this.setState({currentPage: 1});
        if(type=="search"){
          let val = e.target.value;
          this.filterItems(val, type);
        }
        if(type=="status"){
          const statusList = [];
          this.setState({statusFilter:""});

          e.map((item)=>{
              statusList.push(item.label)
              this.setState({statusFilter:statusList})
        });
      }
        if(type=="classification"){
          const classList = [];
          this.setState({classificationFilter:""})
          e.map((item)=>{
            classList.push(item.label)
           this.setState({classificationFilter:classList})
        });
        }
        if(type=="account"){
          const accountList = [];
          this.setState({classificationFilter:""})
          e.map((item)=>{
            accountList.push(item.label)
            this.setState({accountFilter:accountList})
        });
        } 
      }
  
      searchClick= ()=>{
        const title=this.state.searchText.toLowerCase(),
        status= this.state.statusFilter.toString(),
        ideaClassification=this.state.classificationFilter.toString(),
        account=this.state.accountFilter.toString(),
        dateFrom=this.state.fromDate,
        dateTo= this.state.toDate,
        pageNumber=0, numberOfData=20
        this.setState({
          userArray:[],
          ideas:[]
         })
        this.props.dispatch(userActions.fetchAllIdeas(title,status,ideaClassification,account,dateFrom,dateTo,pageNumber,numberOfData));
       const { allIdeas} = this.props;
        const ideas= (allIdeas && allIdeas.allIdeas  && allIdeas.allIdeas.content) ? allIdeas.allIdeas.content:[];
        this.setState({
         ideas
         })
        const userArray= (allIdeas && allIdeas.allIdeas  && allIdeas.allIdeas.content) ? allIdeas.allIdeas.content:[];
        this.setState({
          userArray
         })
      }
      searchBy = () => {
        let searchBy = [];
        {
          searchBy.push(
            ...this.state.ideas.filter(item => {
              let searchText =
                this.state.searchText != ""
                  ? item.title
                      .toLowerCase()
                      .search(this.state.searchText.toLowerCase()) !== -1 ||
                    item.problem
                      .toLowerCase()
                      .search(this.state.searchText.toLowerCase()) !== -1
                  : true;
              let statusFilter =
                this.state.statusFilter !== "" && this.state.statusFilter !== "All" 
                  ? item.idea_Status.toLowerCase() === this.state.statusFilter.toLowerCase()
                  : true;
              let classificationFilter =
                this.state.classificationFilter !== "" &&  this.state.classificationFilter !== "All" 
                  ? item.classification.toLowerCase() === this.state.classificationFilter.toLowerCase()
                  : true;
             let accountFilter =
                  this.state.accountFilter !== "" && this.state.accountFilter !== "All"
                    ? item.account.toLowerCase() === this.state.accountFilter.toLowerCase()
                    : true;
            
              return searchText && statusFilter && classificationFilter && accountFilter;
            })
          );
        }
        this.setState({ userArray: searchBy });
      };

    render() {
        const { userArray,currentPage, ideasPerPage } = this.state;
        const { ideaStatusList, ideaClassification, accounts }= this.props;
        const ideaStatusListOption=ideaStatusList && ideaStatusList.ideaStatusList.length>0 && ideaStatusList.ideaStatusList.map((item, i)=>{
          var obj = item;
          obj.label = item.statusName;
          obj.value=  i;
          return obj       
        });
        const obj={
          label:"All", value:""
        }
       // ideaStatusListOption.push(obj);
        const ideaClassificationOption=ideaClassification && ideaClassification.ideaClassification.length>0 && ideaClassification.ideaClassification.map((item, i)=>{
          var obj = item;
          obj.label = item.classificationName;
          obj.value= i;
          return obj   
        });
        
       // ideaClassificationOption.push(obj);
        const accountsOption=accounts && accounts.accounts.length>0 && accounts.accounts.map((item, i)=>{
          var obj = item;
          obj.label = item.accountName;
          obj.value= i;
          return obj   
        });
         
      //  accountsOption.push(obj);
        var handleToUpdate  =   this.handleToUpdate;
        var sortBy          =   this.sortBy;
        const {loading}= this.props.allIdeas;
        return (
          <Router>
            <div className="valueAdditionPage ml-2">
            <div className="row">
                 <div className="col-sm-3 col-md-2 col-lg-2">
                    <input type="text" className="keywordSearch" placeholder="Keyword Search"  onChange={this.handleChange.bind(this, 'search')}/>
                 </div>
                 <div className="col-sm-6 col-md-2 col-lg-2">
                 <div className="mb-3">
                          <p>Status</p>
                      {ideaStatusList&&
                        <div className="mt-3"><ReactMultiSelectCheckboxes options={ideaStatusListOption }   onChange={this.handleChange.bind(this, 'status')}  />
                          </div> 
                      }
                    </div>
                 </div>
                 <div className="col-sm-2 col-md-2 col-lg-2 pr-0">
                
                 <div className="mb-3">
                 <p>Idea Classification</p> 
                   <div className="mt-3"><ReactMultiSelectCheckboxes options={ideaClassificationOption }  onChange={this.handleChange.bind(this, 'classification')}/>
                   </div> 
                    </div>
                 </div>
                 <div className="col-sm-2 col-md-2 col-lg-2 pr-0">
                 
                 <div className="mb-3">
                 <p>Account list</p> 
                    <div className="mt-2">
                          <ReactMultiSelectCheckboxes options={accountsOption }  onChange={this.handleChange.bind(this, 'account')}/>
                          </div>
                    </div>
                 </div>
                 <p>Year </p> 
                 <div className="col-sm-6 col-md-1 col-lg-1 pr-1">
                 
                    <div className="d-flex justify-content-around">
                      <p> Start Date </p>
                      </div>
                      <div className="d-flex justify-content-around">
                      <p> </p> <p>End Date </p>
                         </div>
                 
                 </div>
                 
                   
                 <div className="col-sm-6 col-md-2 col-lg-2 pr-0 pl-0">
                 <DatePicker
                      selected={this.state.startDate}
                      onChange={this.handleStartDateChange}
                      dateFormat="dd/MM/yy"
                  /> <br/>
    
                  <DatePicker
                      selected={this.state.endDate}
                      onChange={this.handleEndDateChange}
                      dateFormat="dd/MM/yy"
                  />
                  
                  </div>
                 <div className="col-sm-12 col-md-12 col-lg-12 pr-2 d-flex justify-content-end">
                     <button className="btn btn-search"  onClick={this.searchClick}> Search
                      </button>
                 </div>
                
                 </div>
                 <div className="row d-flex">
                 
                 </div>
                <div className="myIdeas mt-5">
                    {loading ? <Loader /> : <div className="content">
                        <AllIdeas ideas={userArray}  ideaFields={data.AllIdeas}  currentPage={currentPage} ideasPerPage={ideasPerPage} handleToUpdate = {handleToUpdate.bind(this)} sortBy = {sortBy.bind(this)} />
                    </div> }
			    </div>
          <Route path="/ValueAdds/Idea/:id" component={Idea}></Route>
            </div>
           </Router> 
            
        )
    }
}
function mapStateToProps(state) {
  const { authentication,ideaStatusList,ideaClassification,accounts,allIdeas } = state;
  const { user } = authentication;
  return {
      user,
      ideaStatusList,
      ideaClassification,
      accounts,
      allIdeas
  };
}

const connectedValueAdds = connect(mapStateToProps)(ValueAdds);
export { connectedValueAdds as ValueAdds };
import React, {Component} from 'react'
import ProgressGraph from '../components/ProgressGraph';
import IdeaPanel from '../components/IdeaPanel';
import VCFGraph from '../components/VCFGraph';
import IdeaStatus from '../data/IdeasStatus.json';
import VCFGraphData from '../data/VCFData.json';
import  '../assets/css/Dashboard.css'
import FlipCounter from '../components/FlipCounter';
import '../assets/css/flipCounter.css';

class Dashboard extends Component {
    state = {
        data: IdeaStatus,
        VCFData:VCFGraphData
    }
    render() {
        return (
            <div className="row ml-0 ">
                
                <div className="col-12 pl-0 pr-0 d-flex">
                        <div className="row">
                        <div className="col-md-3">
                            Business Unit
                             </div>
                             <div className="col-md-3">
                            Account
                        </div>
                        <div className="col-md-3">
                        Year-2019
                        </div>
                        <div className="col-md-3">
                        <button>Submit</button>
                        </div>
                        <div className="col-md-8"></div>
                            <ProgressGraph/>
                        </div>
                        {/* <div className="col-md-3">
                        <VCFGraph VCFData={this.state.VCFData}/>
                        </div> */}
                        <div className="col-md-4">
                            {/* <IdeaPanel  data={this.state.data}/> */}
                            <div className="flipCounterUpper"><span>Total Idea Submitted</span></div>
                            <div>
                                 <FlipCounter />
                                 </div>    
                           <div className="flipCounterlower"><span>Announcements</span></div>
                        </div>
                </div> 
            </div>
        )
    }
}
export default Dashboard;
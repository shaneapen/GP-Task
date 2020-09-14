import React from "react";
import Sidebar from "./Sidebar";
import ContentArea from "./ContentArea";

class DashboardContainer extends React.Component{

    render(){
        return(
            <div id='viewport'>
                <Sidebar />
                <ContentArea />
            </div>
        )
    }
}

export default DashboardContainer;


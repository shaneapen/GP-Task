/* eslint-disable no-unused-expressions */

import React from "react";
import NavBar from "./NavBar";
import Content from "./Content";

class ContentArea extends React.Component {
    render(){
        return(
            <div className='content'>
                <NavBar/>
                <Content/>
            </div>
        )
    }
   
};

export default ContentArea;
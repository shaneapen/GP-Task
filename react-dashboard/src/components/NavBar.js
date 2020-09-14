/* eslint-disable react/react-in-jsx-scope */
import React from "react";

class NavBar extends React.Component{
    render(){
        return(
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                     <ul className="nav navbar-nav navbar-right">
                          <li>
                            <select name="location" className="location">
                                <option value="San Jose, CA">San Jose, CA</option>
                                <option value="Kochi">Kochi</option>
                            </select>
    
                        </li>
                        <li><a href="/logout">Logout</a></li>
              </ul>
            </div>
          </nav>
        )
    }
}
export default NavBar;
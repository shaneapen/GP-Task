/* eslint-disable no-unused-expressions */
import React from "react"

class Sidebar extends React.Component {
    state = {
        sidebarLinks : [
            {
                id:1,
                title: "Dashboard",
                href: "#",
                icon: "zmdi-home"
            },
            {   
                id: 2,   
                title: "Website",
                href: "#",
                icon: "zmdi-view-compact"
            },
            {   
                id: 3,
                title: "Visitors",
                href: "#",
                icon: "zmdi-mouse"
            },
            {   
                id: 4,
                title: "Reviews",
                href: "#",
                icon: "zmdi-star"
            },
            {   
                id: 5,
                title: "Listings",
                href: "#",
                icon: "zmdi-format-list-bulleted"
            },
            {   
                id: 6,
                title: "Appointments",
                href: "#",
                icon: "zmdi-calendar"
            },
            {   
                id: 7,
                title: "Settings",
                href: "#",
                icon: "zmdi-settings"
            }
        ]
    }
    render(){
        return(
            <div className='sidebar'>
                <header>
                     <a href="#">GROWTH PLUG</a>
                </header>
                <ul className='nav'>
                    {
                        this.state.sidebarLinks.map(link => (
                          <li key={link.id}>
                              <a href={link.href}>
                                  <i className={"zmdi " + link.icon}></i> {link.title}
                              </a>
                          </li>
                        ))
                       
                    }
                </ul>
            </div>
        )
    }
   
}

export default Sidebar;
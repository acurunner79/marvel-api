import React from 'react'
import { Link } from "react-router-dom"
import '../styles/RightNav.css'



const RightNav = () => {
  
  
    return (     
    <div id="rightnav-main">
        <ul>
            <Link to="/" className="links" activeClassName="active" iscurrent="true">
                <li className="rightnav-item">
                    Home
                </li>
            </Link>
            <Link to="/marvel-search" className="links" activeClassName="active" iscurrent="true">
                <li className="rightnav-item">
                    Characters
                </li>
            </Link>
            <Link to="/comic-search" className="links" activeClassName="active" iscurrent="true">
                <li className="rightnav-item">
                    Comics
                </li>
            </Link>       
        </ul>
    </div>
    )
}

export default RightNav

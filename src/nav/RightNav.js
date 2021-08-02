import React from 'react'
import { Link } from "react-router-dom"
import '../styles/RightNav.css'



const RightNav = (props) => {
  
  
    return (     
    <div className="links-container">
        <Link to="/">
            <li className="links" onClick={props.handleClick}>
                Home
            </li>
        </Link>
        <Link to="/marvel-search">
            <li className="links" onClick={props.handleClick}>
                Characters
            </li>
          </Link>
          <Link to="/comic-search">
            <li className="links" onClick={props.handleClick}>
                Comics
            </li>
          </Link>       
    </div>
    )
}

export default RightNav

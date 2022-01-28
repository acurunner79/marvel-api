import React from 'react'
import { Link } from "react-router-dom"
import '../styles/nav.css'

const TopNav = () => {
    return (
        <div id="nav-container">
            <nav id="navbar">
                <ul id="nav-links">
                <Link to="/" className="topnav-link" activeClassName="active" iscurrent="true">
                    <li className="nav-item">
                    Home
                    </li>
                </Link>
                <Link to="/marvel-search" className="topnav-link" activeClassName="active" iscurrent="true">
                    <li className="nav-item">
                    Characters
                    </li>
                </Link>
                <Link to="/comic-search" className="topnav-link" activeClassName="active" iscurrent="true">
                    <li className="nav-item">
                    Comics
                    </li>
                </Link>
                </ul>
            </nav>
        </div>
    )
}

export default TopNav


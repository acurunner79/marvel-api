import React from 'react'
import { Link } from 'react-router-dom' 
import '../styles/nav.css'


const Nav = () => {
    return(
        <div className="nav">
            <ul className="nav-links">
            <Link to="/">
                <li>Home</li>
            </Link>
            <Link to="/marvel-search">
                <li>Characters</li>
            </Link>
            <Link to="/comic-search">
                <li>Comics</li>
            </Link>
            </ul>
        </div>
    )
}


export default Nav
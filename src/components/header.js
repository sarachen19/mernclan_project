import React from "react";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
    return ( <header>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <Link className="navbar-brand" to="/">
        Noteworks
      </Link>
          
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
            <NavLink className="nav-item nav-link" to="/home">
            Home
          </NavLink>
            <NavLink className="nav-item nav-link" to="/journal">
            Journal
          </NavLink>
          <NavLink className="nav-item nav-link" to="/task">
            Task
          </NavLink>
          <NavLink className="nav-item nav-link" to="/note">
            Note
          </NavLink>
          <NavLink className="nav-item nav-link" to="/resume">
            Resume
          </NavLink>
          <NavLink className="nav-item nav-link" to="/job-application">
            Job Application
          </NavLink>
            </ul>
            
          </div>
        </nav>
      </header> );
}
 
export default Header;
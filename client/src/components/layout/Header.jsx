import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../store/Auth";


function Header() {
  const { isLoggedIn, logoutUser } = useAuth();
  console.log(isLoggedIn);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand">Online Learning Platform</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/home">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/services">Services</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/courses" >Courses Offers</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact" >Contact</NavLink>
            </li>
           
            {isLoggedIn ? (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/logout"
                  onClick={(e) => {               
                    logoutUser(); // Call logout function
                    user="";//x
                  }}
                >
                  Logout
                </NavLink>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">Register</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signin">Sign In</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;

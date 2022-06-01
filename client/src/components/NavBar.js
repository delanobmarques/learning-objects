import React from 'react';
import '../css/signin.css';
import { Link } from "react-router-dom";
import authService from '../services/authService';
import { withRouter } from 'react-router-dom';

//************react-loader-spinner*****************

const NavBar = () => {
    
  const loggedInUser = () => {       
    let token = authService.getToken()
    let base64Payload = token.split('.')[1]; //grab the firt part of payload where user is store
    let payload = Buffer.from(base64Payload, 'base64').toString();// decod the base64-encoded string containig the user 
    let user = JSON.parse(payload).user; //parsing theJSON string containing the user
    return user;   
  };
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">          
          <div className="container">
                    
            <Link to="/" className="navbar-brand nav-link d-flex align-items-center">
              <i className="fa fa-tablet fa-lg mr-2" aria-hidden="true"> </i>             
              <strong> Learning Objects<span className="sr-only">(current)</span></strong>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsExample07">
              <ul className="navbar-nav mr-auto">
                
                <li className="nav-item">
                  <Link className="nav-link" to="/createform">Create New Record</Link>
                </li>
                
              </ul>
            </div>
            
              <ul className="navbar-nav navbar-right">
              {
                
                authService.isAuthenticated() ? (
                  <React.Fragment>
                    <li className="nav-item active dropdown">
                      <a className="nav-link dropdown-toggle" href="/#" id="dropdown08" data-toggle="dropdown" aria-expanded="false">Welcome {loggedInUser()} !</a>
                      <div className="dropdown-menu" aria-labelledby="dropdown08">
                        <Link className="dropdown-item" to="/signout" >Logout</Link>
                      </div>
                    </li>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <li className="nav-item active">
                      <Link className="nav-link" to="/signin">Login</Link>
                    </li>
                    <li>
                      <Link className="nav-link" to="/register">Register <span className="sr-only">(current)</span></Link>
                    </li>
                  </React.Fragment>
                )
              }

            </ul>
          
          </div>              
        </nav>
      </>
    )
}
 
export default withRouter(NavBar);

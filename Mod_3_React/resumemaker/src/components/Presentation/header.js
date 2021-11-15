import { connect } from 'react-redux';
import React from 'react';
import logo from '../../static/images/logo.png';
import { NavLink } from "react-router-dom";
// import '../../static/scss/header.scss'
const Header = (props) => {
    const handleLogOut =()=>{

    }
    return (
        <header className="header">
        <nav className="nav">
            <a href="/" className="holder-logo">
              <img className='logo' src={logo}></img>
            </a> 
              <div className="header-links full-height">
      
              {/* { isLoaded(auth) && !isEmpty(auth) ? */}
              <>
      
                <ul>
                  <li className="signin ">
                    <NavLink className="  " to="/">
                     Logged in as 
                     {/* {auth.email} */}
                    </NavLink>
                  </li>
                  <li className="signin"> 
                    <button className="text-blue btnv-3" onClick={handleLogOut}>
                   Signout
                    </button>         
                  </li>
                </ul>
      
              </>
              {/* :<LoggesOut></LoggesOut>} */}
                
                <ul id="nav-mid">
                  <li>
                  <NavLink className="btn-nvt-gm" to="/resume-templates">
                  Resume Templates
                  </NavLink>
                  </li> 
                  <li className="holder-pricing">            
                    <NavLink className="btn-nvt-gm" to="/about-us">
                    About Us
                    </NavLink>
                  </li>        
                </ul>
                  
            </div>   
          </nav>
        </header>
    );
}

const mapStateToProps = (state)=>{

}

const mapDispatchToProps = (dispatch) =>{

}
 
export default connect(mapStateToProps,mapDispatchToProps)(Header);
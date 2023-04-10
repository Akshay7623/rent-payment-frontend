import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = ({cl1,cl2,cl3,cl4})=> {

  return (
    <>
   
    <div className="appBottomMenu">
      <div className={cl1}> <NavLink to="/home">
        <p> <i className="fa fa-home"></i> <span><b>Home</b></span> </p>
        </NavLink>
        </div>
      <div className={cl2}> <NavLink to="/pay">
        <p> <i className="fa fa-money"></i> <span><b>Pay</b></span> </p> 
        </NavLink> </div>
          <div className={cl3}> <NavLink to="/history">
        <p> <i className="fa fa-history"></i> <span><b>History</b></span> </p>
        </NavLink> </div>

        <div className={cl4}> <NavLink to="/account" className="icon">
        <p> <i className="fa fa-user"></i> <span><b>Account</b></span> </p>
        </NavLink> </div>
        </div>
    </>
  )
}


Footer.defaultProps ={
  cl1:'item',
  cl2:'item',
  cl3:'item',
  cl4:'item'
}

export default Footer;
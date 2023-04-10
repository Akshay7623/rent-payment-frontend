import React from 'react';
import { NavLink } from 'react-router-dom';
import Left from './image/Left.png';
import logo from './image/logo.png';

const Header = (props)=> {
  return (
    <>
    {props.ShowImg ?  
<div style={{backgroundImage: 'linear-gradient(79deg, #0b2025 0%, #29454c 50.26%, #36535a 98.44%'}}>
          <div className="text-left" style={{padding: '0px 10px 0px 10px'}}> 
            <div className>
              <span><img src={logo} alt="" width={30} height={30} style={{margin: '8px 0px 10px 10px', borderRadius: '50%', filter:'invert(100%)'}} /> </span>
              <span style={{color: 'white', fontWeight: 500, fontSize : '16px'}}> &nbsp;&nbsp;&nbsp;&nbsp;{props.title}</span>
            </div>
          </div>
        </div>:   
        <div style={{backgroundImage: 'linear-gradient(79deg, #0b2025 0%, #29454c 50.26%, #36535a 98.44%'}}>
    <div className="text-left" style={{padding: '0px 10px 0px 10px'}}> 
      <div><NavLink to={props.redirect} ><img src={Left} width={30} height={30} alt='left' style={{margin: '8px 0px 10px 10px',filter: 'invert(100%)'}} /> </NavLink>
        <span style={{color: 'white', fontWeight: 500, fontSize : '16px'}}> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.title}</span>
        <span> </span>
      </div>
    </div>
  </div>
    }
    </>
  )
}

export default Header;
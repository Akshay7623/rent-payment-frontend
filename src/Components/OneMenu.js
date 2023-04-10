import React from 'react';
import { NavLink } from 'react-router-dom';

const  OneMenu = (props)=> {
  return (
    <>
<div className="card-header">
                <div className="nameContainer">
                  <img src={props.img} alt={props.alt} />
                  <h2 className="mb-0">
                    <NavLink to={props.redirect} className="btn btn-link collapsed"> {props.name}
                    </NavLink>
                  </h2>
                </div>
              </div>
              <br />
    </>
  )
};

export default OneMenu;
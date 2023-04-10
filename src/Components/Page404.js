import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Auth from "./Auth";
import Header from "./Header";
import Footer from "./Footer";

const Page404 = () => {
    
  const [userAuth, setUserAuth] = useState(false);
  useEffect(() => {
    Auth().then((data) => {
      if (data.auth) {
        setUserAuth(true);
      }
    });
  }, []);

  return (
    <>
      {userAuth ? (
        <div className="container">
            <Header title="Go to home" redirect="/home"/>
            <div style={{ textAlign: "center", marginTop: "150px" }}>
            <h1>404</h1>  Page not found !
            <h5>
              <NavLink style={{ color: "#226371" }} to="/home">
                Go to home
              </NavLink>
            </h5>
          </div>
            <Footer/>
        </div>
      ) : (
        <div classNam="container">
          <div style={{ textAlign: "center", marginTop: "160px" }}>
            <h1>404</h1> Page not found !
            <h5>
              <NavLink style={{ color: "#226371" }} to="/login">
                Go to home
              </NavLink>
            </h5>
          </div>
        </div>
      )}
    </>
  );
};

export default Page404;

import React, { useState, useRef,useEffect} from 'react';
import toast, { Toaster } from "react-hot-toast";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Left from './image/Left.png';
import Auth from './Auth';

const ForgotPass = () => {

  const navigate = useRef(useNavigate());
  const [myvalue, setMyValue] = useState({
    mobile: ''
  });

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setMyValue({ ...myvalue, [name]: value });
  }
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (myvalue.mobile.toString().length!==10) {
      toast.error("Please enter valid mobile number !");
      return;
    }
    const data = await fetch("http://localhost:5000/forgotpass", { 
       method: "post",
       body: JSON.stringify({mobile:myvalue.mobile}),
       headers:{
         "Content-Type": "application/json"
        }
     });
     const result = await data.json();
     if(result.message === "OTP_SENT"){
       localStorage.setItem("token",result.token);
       navigate.current('/passenterotp');
     }else{
     toast.error("User not found !");
     }
  }

  useEffect(() => {
    Auth().then((data)=>{
      if(data.auth){
        navigate.current('/home');
      }
    });
  }, []);
  

  return (
    <>
    <Toaster />
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
           
              <div className="left"> <NavLink to='/' className="icon goBack"  style={{position:"absolute",top:"10px",left:"10px"}}><img src={Left} alt='left' style={{ filter: 'invert(30%)' }} /> </NavLink>
                <h6 style={{ color: 'black', fontWeight: '300', fontSize: '16px ' }} className="pageTitle">Reset Password</h6>
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form method="post" className="card-body" >
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                </div>
                <div className="d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">Enter Number</p>
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label">Enter Registered Mobile </label>
                  <input type="number" name="mobile" value={myvalue.mobile} onChange={handleInput} className="form-control form-control-lg" placeholder="Enter Number" maxLength={13} autoComplete='off' />
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button onClick={handleSubmit} type="submit" className="btn btn-dark btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', background: '#226371 !important' }}>Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      =
    </>
  )
}

export default ForgotPass;
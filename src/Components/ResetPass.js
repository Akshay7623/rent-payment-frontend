import React, { useState,useEffect,useRef } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import Auth from './Auth';

const ResetPass = () => {
   
  const navigate = useRef(useNavigate());
  
  const verify = async()=>{
    const token = localStorage.getItem("token");
    if (token === null || token === undefined) {
      navigate.current('/');
    }else{
      const data = await fetch("http://localhost:5000/authreset", {
        method: "post",
        body: JSON.stringify({ newpassword:myvalue.password }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const result = await data.json();
      if (result.message==="INVALID") {
          navigate.current('/');
      }
    }
  }

  useEffect(() => {
    Auth().then((data)=>{
      if(data.auth){
        navigate.current('/home');
      }
    });
    verify();
  }, []);

  const [myvalue, setMyValue] = useState({
    password: '',
    Cpassword: ''
  });

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setMyValue({ ...myvalue, [name]: value });
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (myvalue.password.toString().trim()===''||myvalue.Cpassword.toString().trim()==='') {
      toast.error("Please enter valid password !");
      return;
    }
    if (myvalue.password.toString().length<6) {
      toast.error("Password must be 6 character long !");
      return;
    }
    const token = localStorage.getItem('token');
    if (myvalue.password===myvalue.Cpassword) {
      const data = await fetch('http://localhost:5000/submitresetpass',{
        method:"post",
        body:JSON.stringify({token:token, newPassword:myvalue.password}),
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`,
        }
      });
      const result = await data.json();

      if(result.message==="SUCCESS"){
        toast.success('Password reset successfully ');
        setTimeout(()=>{
          navigate.current('/login');
        },1300);
        localStorage.clear();
      }else if(result.message === "INVALID_DATA"){
        toast.error("session expired !");
        navigate.current("/login");
      }else if (result.message === "FAIL") {
        toast.error("some server error accurred !");
      }
    }else{
      toast.error("Password doesn't matched !");
    }
  }

  return (
    <>
    <Toaster />
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form action="#" id="loginForm" method="post" className="card-body" autoComplete="off" noValidate="novalidate">
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                </div>
                <div className="d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">Reset Password</p>
                </div>
                <div className="form-outline mb-3">
                  <label className="form-label" >Enter New Password</label>
                  <input type="password" name="password" className="form-control form-control-lg" value={myvalue.password} onChange={handleInput} placeholder="New Password" autoComplete='off'/>
                </div>
                <div className="form-outline mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input type="password" name="Cpassword" className="form-control form-control-lg" value={myvalue.cpassword} onChange={handleInput} placeholder="Confirm Password" autoComplete='off'/>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button type="submit" onClick={handleSubmit} className="btn btn-dark btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', background: '#226371 !important' }}>Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ResetPass;
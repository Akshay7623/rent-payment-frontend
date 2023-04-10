import React, { useState,useRef,useEffect} from 'react';
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import Auth from './Auth';
import Logo from './image/logo.png';
import Instagram from './image/instagram.png';
import Twitter from './image/twitter.png';

const Login = () => {

  const navigate = useRef(useNavigate());
  const [myvalue, setMyValue] = useState({
    mobile: '',
    password: ''
  });

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setMyValue({ ...myvalue, [name]: value });
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (myvalue.mobile.length !==10) {
      toast.error("Please enter valid mobile number !");
      return;
    }
    if (myvalue.password ==='' ) {
      toast.error("Please enter valid password !");
      return;
    }
    if (myvalue.password.length<6 ) {
      toast.error("Please enter valid password !");
      return;
    }
    
    const data = await fetch('http://localhost:5000/login',{
      method: "POST",
      body:JSON.stringify({mobile:myvalue.mobile,password:myvalue.password}),
      headers:{
        "Content-Type": "application/json"
      }});
      const result = await data.json();
      if (result.message==="CORRECT_DATA") {
        localStorage.removeItem("token");
        localStorage.setItem("token",result.token);
        navigate.current('/home');
      }else{
        toast.error("Invalide mobile number or password !");
      }
  }

  useEffect(() => {
    Auth().then((data)=>{
      if(data.auth){
        navigate.current('/home');
      }
    });
  }, [])
                
  let inputTypeNumbers = document.querySelectorAll("input[type=number]");
  inputTypeNumbers.forEach((ele)=>{
    ele.onwheel = function (event) {
      event.target.blur();
  };})

  return (
    <>
    <Toaster />
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <img className="logo-style" src={Logo} alt="Logo"/>
          <div className="row d-flex justify-content-center align-items-center h-100">

            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 adjust-container">
              <form method="post" className="card-body">
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                </div>
                <div className="d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">Welcome Back to FiePay !</p>
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label">Enter Mobile Number</label>
                  <input type="number" className="form-control form-control-lg" name='mobile' value={myvalue.mobile} onChange={handleInput} placeholder="Mobile Number" maxLength={13} autoComplete='off' />
                </div>
                <div className="form-outline mb-3">
                  <label className="form-label">Enter Password</label>
                  <div>
                  <input type="password" className="form-control form-control-lg" name='password' value={myvalue.password} onChange={handleInput} placeholder="Password" autoComplete='off'/>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-check mb-0">
                    <input className="form-check-input me-2" type="checkbox" defaultChecked={true} required/>
                    <label className="form-check-label" >
                      Remember me
                    </label>
                  </div>
                  <NavLink to="/forgotpass" className="text-body">Forgot password?</NavLink>
                </div>
                <div className="text-center text-lg-start mt-2 pt-2">
                  <button onClick={handleSubmit} type="submit" className="btn btn-dark btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', background: '#226371 !important' }}>Login</button>
                  <p className="fw-bold mt-2 pt-1 mb-0" style={{fontSize:"14px"}}>Don't have an account? <NavLink to="/" className="link-danger">Register</NavLink></p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <footer>
          <p className="text-center" style={{fontSize:"14px"}}>Follow Us on !</p>
          <div className="footer-social">
            <div><a href="#" target="_blank"><img src={Instagram}  alt="instagram"/></a></div>
            <div><a href="#" target="_blank"><img src={Twitter}  alt="twitter"/></a></div>
          </div>
          </footer>
      </section>
    </>
  )
}

export default Login;
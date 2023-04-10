import React, { useState, useEffect, useRef } from "react"
import  { ResendOTP } from "otp-input-react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import Auth from './Auth';

const PassEnterOtp = () => {
  //add some more authentication in prodution
  const [myvalue, setMyValue] = useState({
    otp: "",
  });
  const navigate = useRef(useNavigate());
  

  const Verify = async (token) => {
      const data = await fetch("http://localhost:5000/sendresetotp", {
        method: "post",
        body: JSON.stringify({ token: token }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const result = await data.json();
      if (result.message === "INVALID") {
        navigate.current('/');
      }

      if (result.message === "OTP_SENT") {
        const mobile = result.mobile;
        localStorage.clear();
        localStorage.setItem("mobile",mobile);
        toast.success("OTP sent successfully !");
      }
   
  };

  



  useEffect(() => {
    Auth().then((data)=>{
      if(data.auth){
        navigate.current('/home');
      }
    });

    const token = localStorage.getItem("token");
    const mobile = localStorage.getItem("mobile");
    if (mobile===null && token===null) {
      //user  have nothing neither token nor mobile so user being redirected
      navigate.current('/');
    }else if(token!==null){
      //now user  have token only not mobile mobile number
      Verify(token);
    }else if(token!==null && mobile !== null){
      Verify(token);
    }

   
  }, []);

  

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setMyValue({ ...myvalue, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (myvalue.otp.length!==4) {
      toast.error("Please enter valid otp !");
      return;
    }else{
      const mobile = localStorage.getItem("mobile");
      const data = await fetch('http://localhost:5000/submitresetotp', {
          method: "post",
          body: JSON.stringify({ otp: myvalue.otp, mobile:mobile }),
          headers: {
            "Content-Type": "application/json",
          }});
      const result =  await data.json();
      if (result.message ==="VALID_OTP") {
        localStorage.setItem("token",result.token);
        navigate.current('/resetpass');
      }else if (result.message ==="INVALID_OTP") {
        toast.error("Invalid otp !");
      }else if (result.message === "LIMIT_REACHED" ) {
        toast.error("Otp has been expired please send again !");
      }

    }
    

  };


  const resendOtp = async (e) => {
    // e.preventDefault();
    const mobile =  localStorage.getItem("mobile");
    const data =  await fetch("http://localhost:5000/resendotppass",{
      method: "post",
        body: JSON.stringify({ mobile: mobile }),
        headers: {
          "Content-Type": "application/json"
        },})
      const result = await data.json();
      if (result.message==="SESSION_EXPIRED") {
        navigate.current('/');
      }else if(result.message === "OTP_UPDATED"){
        toast.success("OTP sent successfully on WhatsApp !");
      }else{
        toast.error("some server error occurred !");
      }
  }

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
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form method="post" className="card-body">
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start"></div>
                <div className="d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">OTP</p>
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label">Enter OTP </label>
                  <input type="number" name="otp"
                    value={myvalue.otp} onChange={handleInput}
                    className="form-control form-control-lg" placeholder="Enter OTP"
                    autoComplete="off" />
                </div>
                <ResendOTP className="ResendBtn" onResendClick={resendOtp} />
                <div className="text-center text-lg-start mt-2 pt-2">
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="btn btn-dark btn-lg"
                    style={{
                      paddingLeft: "2.5rem",
                      paddingRight: "2.5rem",
                      background: "#226371 !important",
                    }}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PassEnterOtp;

import React, { useState, useEffect,useRef } from "react";
import { ResendOTP } from "otp-input-react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import Auth from "./Auth";

const EnterOtp = () => {

  const [myvalue, setMyValue] = useState({otp: "",});
  const navigate = useRef(useNavigate());

  useEffect(() => {
    const RecordAvailable = async (mobile) => {
      let data = await fetch("http://localhost:5000/recordavail", {
        method: "post",
        body: JSON.stringify({ mobile: mobile }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let result = await data.json();
      if (!result.auth) {
        localStorage.removeItem("mobile")
        navigate.current("/");
      }else{
        toast.success("OTP sent on Successfully !");
      }
    };
    
    let mobile = JSON.parse(localStorage.getItem("mobile"));
    if (mobile == null || mobile.length !== 10) {
      navigate.current("/");
    } else {
      RecordAvailable(mobile);
      }
      Auth().then((data)=>{
        if(data.auth){
          navigate.current('/home');
        }
      });


  }, []);

  

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setMyValue({ ...myvalue, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (myvalue.otp.trim()===''||myvalue.otp.length!==4) {
      toast.error("Enter otp !");
      return;
    }
    let mobile = JSON.parse(localStorage.getItem("mobile"));
    const SubOtp = await fetch('http://localhost:5000/submitotp',{
      method:"post",
      body: JSON.stringify({ mobile: mobile,otp:myvalue.otp }),
      headers:{
        "Content-Type":"application/json"
      }
    })
    let result = await SubOtp.json();
    if(result.message==="CORRECT_OTP"){
      localStorage.clear();
      localStorage.setItem("token",result.token);
      navigate.current('/home');
    }else if(result.message==="INCORRECT_OTP"){
       toast.error("Incorrect otp entered !");
    }else if(result.message==="LIMIT_REACHED"){
      toast.error("Your otp has been expired !");
    }
    

  };

  const resendOtp = async(e)=>{
  //  e.preventDefault();
   let mobile = JSON.parse(localStorage.getItem("mobile"));
   const data = await fetch('http://localhost:5000/resendotp',{
     method:"post",
     body: JSON.stringify({ mobile: mobile }),
     headers:{
       "Content-Type": "application/json"
      }
    });
    const result = await data.json();
    // response { message:"ERROR" OR message:"TIME_ERROR", or message :"OTP_UPDATED"}
    if(result.message==="OTP_UPDATED"){
      toast.success('OTP sent successfully!');
    }else if(result.message==="TIME_ERROR")
    {
     toast.error("Please resend otp after 1 minute");
    }else if(result.message==="ERROR")
    {
     toast.error("Server internal error accured");
    }
}

let inputTypeNumbers = document.querySelectorAll("input[type=number]");
    inputTypeNumbers.forEach((ele)=>{
      ele.onwheel = function (event) {
        event.target.blur();
    };})

  return (
    <>
    <Toaster/>
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
                    value={myvalue.otp} onChange={handleInput} className="form-control form-control-lg"
                    placeholder="Enter OTP" autoComplete="off" />
                </div>
               
                <ResendOTP className="ResendBtn" onResendClick={resendOtp} />

                <div className="text-center text-lg-start mt-2 pt-2">
                  <button onClick={handleSubmit} type="submit"
                    className="btn btn-dark btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem", background: "#226371 !important", }}  >
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

export default EnterOtp;
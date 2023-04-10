import React, { useState,useEffect,useRef} from "react";
import toast, { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import Auth from "./Auth";
import Logo from './image/logo.png';
import Instagram from './image/instagram.png';
import Twitter from './image/twitter.png';

const Signup = () => {
  
  const navigate = useRef(useNavigate());
  const [viewPass, setViewPass] = useState("fa fa-eye");
  const [passType, setPassType]= useState("password");

  const [myvalue, setMyValue] = useState({
    name: "",
    mobile: "",
    password: "",
    cpassword: "",
  });
  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setMyValue({ ...myvalue, [name]: value });
    };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (myvalue.name.trim()==='') {
      toast.error("Pleae enter name !");
      return;
    }
    if (myvalue.mobile.trim().length!==10) {
      toast.error("Please enter valid number !");
      return;
     }

    if (myvalue.password.trim()==='') {
      toast.error("Please enter passeword !");
      return;
    }
    if (myvalue.password.trim().length<6) {
      toast.error("Password length must be greater than 6 characters !");
      return;
    }
    
    if (myvalue.password.trim() !== myvalue.cpassword.trim()) {
      toast.error("Password did not matched !");
      return;
    }
    let result = await fetch("http://localhost:5000/signup", {
      method: "post",
      body: JSON.stringify({
        name: myvalue.name,
        mobile: myvalue.mobile,
        password: myvalue.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    if (result.auth === "useravailable") {
      toast.error("User is already registered please login !");
    } else {
      localStorage.setItem("mobile", JSON.stringify(result.mobile));
      navigate.current("/enterotp");
    }
    //setting a auth token in localstorage with name of token
  };

  const showPassword = ()=>{
    if(viewPass==="fa fa-eye"){
      setViewPass("fa fa-eye-slash");
      setPassType("text");
    }else{
      setViewPass("fa fa-eye");
      setPassType("password");
    }
  }
  useEffect(() => {
    Auth().then((data)=>{
      if(data.auth){
        navigate.current('/home');
      }else{
        return data;
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
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start"></div>
                <div className="d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">
                    Welcome to FiePay!
                  </p>
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label">Enter Your Name</label>
                  <input type="text" name="name" value={myvalue.name}
                    onChange={handleInput} className="form-control form-control-lg"
                    placeholder="Mobile Your Name" autoComplete="off" require />
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label">Enter Mobile Number</label>
                  <input type="number" name="mobile" value={myvalue.mobile}  onChange={handleInput}
                    className="form-control form-control-lg" placeholder="Mobile Number"
                    maxLength={13} autoComplete="off" />
                </div>
               
                <div className="form-outline mb-3">
                  <label className="form-label">Enter Password</label>
                  <div><input type={passType} name="password" value={myvalue.password}
                    onChange={handleInput} className="form-control form-control-lg"
                    placeholder="Password" autoComplete="off" />
                    
                    </div>
                </div>
                <div className="form-outline mb-3">
                  <label className="form-label">Confirm Password</label>
                  <div><input type={passType} name="cpassword" value={myvalue.cpassword} onChange={handleInput}
                    className="form-control form-control-lg" placeholder="Confirm Password"
                    autoComplete="off" />
                    <span onClick={showPassword} style={{margin:"0",padding:"0",marginTop:"-35px",position:"absolute",right:"50px"}}>
                    <i style={{fontSize:"20px",color:"#343a40"}} className={viewPass}></i>
                    </span>
                    </div>

                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="form-check mb-0">
                    <input className="form-check-input me-2" type="checkbox"
                      defaultChecked={true} required />
                    <label className="form-check-label">
                      I agree
                      <NavLink to="/privacy">Privacy policy</NavLink>
                    </label>
                  </div>
                  <NavLink to="/forgotpass" className="text-body">
                    Forgot password?
                  </NavLink>
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button onClick={handleSubmit} type="submit" className="btn btn-dark btn-lg"
                    style={{
                      paddingLeft: "2.5rem",
                      paddingRight: "2.5rem",
                      background: "#226371 !important",
                    }}  >
                    Signup
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0" style={{fontSize:"14px"}}>
                    Already have an account?
                    <NavLink to="/login" className="link-danger">
                      Login
                    </NavLink>
                  </p>
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
  );
};

export default Signup;
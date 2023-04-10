import React, { useState, useEffect, useRef } from "react";
import toast, {Toaster} from 'react-hot-toast';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import Loading from './image/loading1.png';
import Header from "./Header";
import Footer from "./Footer";
import Avatar from "./image/avatar.png";
import Auth from "./Auth";

const EditProfile = () => {
  const [myvalue, setMyValue] = useState({
    name: "",
    email: "",
  });
  const navigate = useRef(useNavigate());
  function validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setMyValue({ ...myvalue, [name]: value });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (myvalue.name.trim()==='' || myvalue.email.trim()==='') {
      toast.error("Please enter all details !");      
      return;
    }
    if (!validateEmail(myvalue.email)) {
      toast.error("Please enter valid E-mail !");
      return;
    }
    
   
    const token = localStorage.getItem("token");
    const data = await fetch("http://localhost:5000/updateprofile", {
      method: "post",
      body: JSON.stringify({
        name: myvalue.name.trim(),
        email: myvalue.email.trim(),}),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    const result = await data.json();
    if (result.success) {
      navigate.current('/profile');
    }else{
      toast.error("Something went wrong from server side !");
    }
  };


  useEffect(() => {
    Auth().then((data) => {
      if (!data.auth) {
        navigate.current("/login");
      }
    });
  }, []);
  return (
    <>
    <div className="container">
    <Toaster/>
    <Header showImg={false} title={"Edit Profile"} redirect={"/profile"} ></Header>
      <div className="pb-2">
        <div className="appContent1 pb-5">
          <form method="post">
            <div className="form-group floating mt-3">
              <label>
                Name<i className="text-danger">*</i>
              </label>
              <input
                type="text"
                className="form-control floating"
                name="name"
                value={myvalue.name}
                onChange={handleInput}
                required
                autoComplete="off"
                placeholder="Name"
              />
            </div>
            <div className="form-group floating">
              <label>
                Email id<i className="text-danger">*</i>
              </label>
              <input
                type="text"
                className="form-control floating"
                name="email"
                value={myvalue.email}
                onChange={handleInput}
                required
                autoComplete="off"
                placeholder="E-mail"
              />
            </div>
            <div className="d-flex justify-content-center text-center mt-1">
              <button
                onClick={handleSubmit}
                type="submit"
                className="btn btn-primary"
                style={{ width: "264px",backgroundColor:"rgb(34 99 113)",border:"none" }}
              >
                
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer cl4={"item active"} />
      </div>
    </>
  );
};

const Profile = () => {
  const [userData,setData] = useState({name:'',mobile:'', email:''});
  const [loading, setLoading] = useState(true);
  const navigate = useRef(useNavigate());
  useEffect(() => {
    Auth().then((data) => {
      if (!data.auth) {
        navigate.current("/login");
      }
    });
    const token = localStorage.getItem("token");
  fetch('http://localhost:5000/showprofile',{
    method:"get",
    headers:{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },}).then((data)=>data.json()).then((finalData)=>{
      setData(finalData[0]);
      setLoading(false);
    });
  }, []);
  

  return (
    <>
    <div className="container">
      <Header showImg={false} title={"Profile"} redirect={"/account"} />
      {loading ? <div className="loading-box"><img  className="rotating loading-img" src={Loading} /></div>: <span></span>}
      <div className="container">
        <div className="mt-2 d-flex justify-content-center">
          <div className="d-flex justify-content-center" style={{ height: "140px", width: "140px" }} >
            <img style={{ width: "82px", height: "82px", marginTop: "35px", borderRadius:"50%"}} src={Avatar} alt="avatar" />
          </div>
        </div>

        <div
          style={{
            boxShadow:
              "0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)",
          }} className="card mb-3">
          <div className="card-body">
            <h6 className="card-title">Hello {userData.name}</h6>
            <p style={{color:"#226371"}}>
              <strong>91{userData.mobile}</strong>
            </p>
            <p>Name : {userData.name}</p>
            <p>Mobile : {userData.mobile}</p>
            <p>
              E-mail : {userData.email}
              <NavLink to="/editprofile" style={{color:"#226371"}} className="text-black pull-right">
                <i className="fa fa-pencil" /> Edit
              </NavLink>
            </p>
          </div>
        </div>
      </div>
      <Footer cl4={"item active"} />
      </div>
    </>
  );
};

export default Profile;
export { EditProfile };
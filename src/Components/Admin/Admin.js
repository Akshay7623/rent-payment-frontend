import React,{useEffect,useRef,useState} from 'react'
import { useNavigate } from "react-router";
import { NavLink } from 'react-router-dom';
import './Admin.css';
import AdminAuth from './AdminAuth';


const Admin = () => {
   const [adminData,setAdminData] = useState({
    DeletedBank : 0,
    activeBank :0,
    paymentCompleted:0,
    remainPay :0,
    totalUser :0,
    });
    const token = localStorage.getItem("adminToken");
    const navigate = useRef(useNavigate());
    const controllNav = ()=>{
        document.getElementById('mySidenav').style.width="70px";
        document.getElementById("main").style.marginLeft="70px";
        document.getElementsByClassName('logo')[0].style.visibility= "hidden";
        document.getElementById('LogoSpan').style.visibility= "visible";
        document.getElementById('LogoSpan').style.marginLeft= "-10px";
        let htmlcollection = document.getElementsByClassName('icon-a');
        let arr = Array.from(htmlcollection);
        arr.forEach(x => {
          x.style.visibility='hidden';
        });
        let htmlCollection1 = document.getElementsByClassName('icons');
        let arr1 =  Array.from(htmlCollection1);
        arr1.forEach((x)=>{
          x.style.visibility='visible';
          x.style.marginLeft='-8px';
        })
        document.getElementsByClassName('nav')[0].style.display= "none";
        document.getElementsByClassName('nav2')[0].style.display= "block";
    }

    const Logout = ()=>{
      localStorage.clear();
      AdminAuth().then((data)=>{
        if (data.message!=="VALID") {
          navigate.current('/admin/login');
        }
      })
    }

    const controllNav2 = ()=>{

      document.getElementById('mySidenav').style.width="300px";
      document.getElementById("main").style.marginLeft="300px";
      document.getElementsByClassName('logo')[0].style.visibility= "visible";
      let htmlcollection = document.getElementsByClassName('icon-a');
      let arr = Array.from(htmlcollection);
      arr.forEach(x => {
        x.style.visibility='visible';
      });
      let htmlCollection1 = document.getElementsByClassName('icons');
      let arr1 =  Array.from(htmlCollection1);
      arr1.forEach((x)=>{
        x.style.visibility='visible';
      })
      document.getElementsByClassName('nav')[0].style.display= "block";
      document.getElementsByClassName('nav2')[0].style.display= "none";
    }


const CustomStyle = {backgroundColor:"#1b203d"};

    useEffect(() => {
      document.body.style.backgroundColor="#1b203d";
      AdminAuth().then((data)=>{
        if (data.message!=="VALID") {
          navigate.current('/admin/login');
        }
      })

      fetch("http://localhost:5000/admin/alldata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          setAdminData(data);
        });


    }, [])
    


  return (
    <>
    <div>
       <div id="mySidenav" className="sidenav">
          <p className="logo"><span id="LogoSpan"></span>Razpay</p>
          <NavLink style={CustomStyle} to="/admin/dashboard" className="icon-a">  <i className="fa fa-hashtag icons" /> Dashboard </NavLink>
          <NavLink to="/admin/users" className="icon-a">  <i className="fa fa-users icons" /> Users </NavLink>
          <NavLink to="/admin/payments" className="icon-a">  <i className="fa fa-money icons" /> Payments </NavLink>
          <NavLink to="/admin/banks" className="icon-a">  <i className="fa fa-list-alt icons" /> Banks </NavLink>
          <NavLink onClick={Logout} className="icon-a">  <i className="fa fa-sign-out icons" /> Logout </NavLink>
        </div>

          <div id="main">
          <div className="head">
            <div className="col-div-4">
              <span style={{fontSize: '30px', cursor: 'pointer', color: 'white'}} className="nav" onClick={controllNav}>☰ Dashboard</span>
              <span style={{fontSize: '30px', cursor: 'pointer', color: 'white'}} className="nav2" onClick={controllNav2}>☰ Dashboard</span>
            </div>
            <div className="col-div-4">
              <div className="profile">
                <p>Hello Admin !</p>
              </div>
            </div>
            <div className="col-div-4">
              <div>
              <input className="searchUserInput" type="text" placeholder="Search user here "/>
              </div>
            </div>
          </div>
          <br />
          <div className="col-div-3">
            <div className="box">
              <p>{adminData.totalUser}<br /><span>Customers</span></p>
              
            </div>
          </div>
          <div className="col-div-3">
            <div className="box">
              <p>{adminData.paymentCompleted}<br /><span>Payment </span></p>
              
            </div>
          </div>
          <div className="col-div-3">
            <div className="box">
              <p>{adminData.remainPay}<br /><span>Remaining</span></p>
             
            </div>
          </div>
          <div className="col-div-3">
            <div className="box">
              <p>{adminData.activeBank}<br /><span>Banks</span></p>
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin
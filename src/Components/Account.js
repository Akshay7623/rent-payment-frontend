import React,{useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router';
import Loading from './image/loading1.png';
import Footer from './Footer';
import OneMenu from './OneMenu';
import HistoryImg from './image/history.png';
import Auth from './Auth';
import { NavLink } from 'react-router-dom';
import imghead from './image/headimg.webp';
import team from './image/team.png';
import bankCard from './image/BankCard.png';
import accountSecurity from './image/AccountSecurity.png';
import terms from './image/terms.png';
import About from './image/About.png';
import wpforms from './image/wpforms.png';


const Account = ()=> {
  const [name, setName ] = useState('');
  const [mobile, setMobile ] = useState('');

const navigate = useRef(useNavigate());
useEffect(() => {
  document.body.style.backgroundColor = "#e0e3e8";
  Auth().then((data)=>{
    if(!data.auth){
      navigate.current('/login');
    }else{
      return data;
    }
  }).then((data)=>{
    setMobile(data.mobile);
    setName(data.name);
  });
}, []);

const hanldeLogout = ()=>{
    localStorage.clear();
    Auth().then((data)=>{
      if(!data.auth){
        navigate.current('/login');
      }
    });

}
  return (
    <>
    <div className="container" style={{backgroundColor:"#e0e3e8"}}>
    <div className="vcard">
      {name=='' ? <div className="loading-box"><img  className="rotating loading-img" src={Loading} /></div>
      :<span></span>}
      <div className="appContent3 text-white">
        <div className="row">
          <div className="col-12 mb-1">
            <div className="user-block"> 
            <img className="img-circle img-bordered-lg" src={imghead} alt='img' /> </div>
           ID : 91{mobile}
           <br/>
            Mobile  : {mobile}
            <br/>
            Name : {name}
            <br/><br/>
           <NavLink to="/pay"><button className="btn-sm" style={{marginRight:"10px",color:'white',background: 'rgb(34 99 113)', border:' 0px solid ',borderRadius:'10px' }}>Pay</button></NavLink> 
            <NavLink to="/history">
            <button type="submit" className="btn-sm" style={{color: 'black', background : "#fff !important", border 
          : '0px solid', borderRadius: "10px"}}> History </button>
            </NavLink></div>
         
          <div className="container">
      <div className="row align-items-start">
        <div className="col">
        </div>
      </div>
        </div>
      </div>
      </div>
</div>
<div className="appContent1 mb-5" >
        <div className="contentBox long mb-3" > 
          <div className="contentBox-body card-body">
            <div className="accordion" id="accordionExample">
<OneMenu img={team} name={'Profile'} alt={'profile'} redirect='/profile' ></OneMenu>
<OneMenu img={bankCard} name={'Bank'} alt={'bank'} redirect='/bank'></OneMenu>
<OneMenu img={HistoryImg} name={'History'} alt={'History'} redirect='/historyin'></OneMenu>
<OneMenu img={accountSecurity} name={'Reset Password'} alt={'security'} redirect='/resetpwd'></OneMenu>
<OneMenu img={terms} name={'Terms and condition'} alt={'terms'} redirect='/tandc'></OneMenu>
<OneMenu img={About} name={'About'} alt={'about'} redirect='/aboutus'></OneMenu>
<OneMenu img={wpforms} name={'Contact Us'} alt={'wpforms'} redirect='/contactus'></OneMenu>
            </div>
          </div>
        </div>
        <div onClick={hanldeLogout } className="text-center mt-4 "> <span className="btn btn-sm  logout" style={{width: '200px', backgroundColor: '#226371', color: 'white', fontWeight: 'bold'}}>Logout</span> </div>  
      </div>

<Footer cl4={'item active'} />
</div>
</>
  )
}

export default Account;
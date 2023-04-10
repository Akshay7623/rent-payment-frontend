import React,{useEffect, useState, useRef} from 'react';
import { NavLink } from 'react-router-dom';
import Loading from './image/loading1.png';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router';
import Auth from './Auth';
const Home = () => {
  const navigate = useRef(useNavigate());
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.backgroundColor = "#e0e3e8";
    Auth().then((data)=>{
      if(!data.auth){
        navigate.current('/login');
      }else{
        setName(data.name);
        setLoading(false);
      }
    });
    
  }, []);

  return (
    <>
    <div className="container">
    <Header ShowImg={true} title={`Welcome ${name}`}/>
    {loading ?  <div className="loading-box"><img  className="rotating loading-img" src={Loading} /></div> : <span></span>}
    <div className="appContent" style={{backgroundColor:"#e0e3e8"}}>
    <div className="vcard outer-vcard" style={{boxShadow:'none', marginTop:'30px'}}>
        <div className="row" style={{backgroundColor:"#e0e3e8"}}>  
          <div className="col-6 pright">
            <div className="vcard card cared"> 
              <NavLink to="/pay" className="postItem">
                <div className="imageWrapper"> </div>
               <b> <p className="text-center">Add + </p></b>
              </NavLink> </div>
          </div>
          <div className="col-6 pleft">
            <div className="vcard card cared"> <NavLink to="/pay" className="postItem">
                <div className="imageWrapper"> </div>
               <b> <p className="text-center">Maintenance</p></b>
              </NavLink> </div>
          </div>
          <div className="col-6 pright">
            <div className="vcard card cared"> 
              <NavLink to="/pay" className="postItem">
                <div className="imageWrapper"> </div>
                <b><p className="text-center">Deposite</p></b>
              </NavLink> </div>
          </div>
          <div className="col-6 pleft">
            <div className="vcard card cared"> <NavLink to="/pay" className="postItem">
                <div className="imageWrapper"> </div>
                <b><p className="text-center">Rent</p></b>
              </NavLink> </div>
          </div>
           </div>
        </div>
           </div>
    <Footer cl1={'item active'}/>
    </div>
    </>
  )
}

export default Home;
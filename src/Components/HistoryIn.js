import React,{useEffect,useRef,useState} from 'react';
import { useNavigate } from 'react-router';
import Loading from './image/loading1.png';
import Header from './Header';
import Footer from './Footer';
import Auth from './Auth';

const History = () => {
  const [HistoryData,setHistoryData] = useState({});
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useRef(useNavigate());
  const DisableAfter = ()=>{
    setTimeout(()=>{
    document.getElementById("loading").style.display="none";
    document.getElementById('NoData').style.display="block";
    },2000);
  }
  useEffect(() => {
    Auth().then((data) => {
      if (!data.auth) {
        navigate.current("/login");
      }
    });

    fetch('http://localhost:5000/historypay',{
      method:"get",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`,
      }
    }).then((data)=>{ return data.json()}).then((finalData)=>{
    setHistoryData(finalData);
    setLoading(false);
    });
  
  }, []);
 
  return (
    <>
    <div className="container">
    <Header showImg={false} title={'History'} redirect='/account' ></Header>
    {loading ?  <div className="loading-box"><img  className="rotating loading-img" src={Loading} /></div>: <span></span>}
    <div>
        <div className="appContent1" style={{paddingTop:'0px',paddingBottom:'0px',paddingLeft:'20px',paddingRight:'20px'}}>
          <div className="mt-1">
            <div className="tab-content" >
              <div className="tab-pane fade active show">
              {HistoryData[0] ? Object.values(HistoryData).map((values,index)=>{
            return (
              <div key={index} className="mt-1" >
              <div className="tab-content" >
                <div className="tab-pane fade active show">
              <div style={{boxShadow:'0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)'}} className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title"><span>Date :</span> {new Date(values.paymentCreatedAt).toLocaleDateString().split('/').join('-') +` `+ new Date(values.paymentCreatedAt).toTimeString().substring(0,8) }</h5>
                      <p style={{color:"#226371"}}><strong><span>Paid to : </span>{values.name}</strong></p>
                      <p><span>Mobile : </span> {values.mobile}</p>
                      <p><span>Amount : ₹</span> {values.amount}</p>
                      <p><span>Order ID : </span> {values.orderId}</p>
                      <p><span>Txn ID : </span> {values._id}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )
          }):
          <div>
            <h6 id="NoData" style={{ marginTop: "10px", marginLeft: "auto", marginRight: "auto",display:"none"}} >
          No history available
        </h6>
        </div>
          }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="appContent1" style={{paddingTop:'0px',paddingBottom:'0px',paddingLeft:'20px',paddingRight:'20px'}}>
        </div>
      </div>
   <Footer cl4={'item active'}/>
   </div>
    </>
  )
};

export default History; 
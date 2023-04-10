import React, { useState, useEffect, useRef } from "react";
import toast, {Toaster} from "react-hot-toast";
import { useNavigate } from "react-router";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Rent from "./image/rent.png";
import Maintanance from "./image/maintanance.png";
import Auth from "./Auth";
import Logo from './image/logo.png';
const Pay = () => {

  //for the bank section
  const [Name, setName] = useState("");
  const [account_number, setAccount_number] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [mobile, setMobile] = useState("");
  const [amount, setAmount] = useState("");
  const [purpose,setPurpose] = useState("");
  // this state used her for the bank account api
  const [Payee, setPayee] = useState({});
  const [method, setMethod] = useState(true);
  const [checkboxval, setCheckboxval] = useState("");
  const [SelectName, setSelectName] = useState("");
  const [upi, setUpi] = useState("");
  const [primaryAmount,setPrimaryAmount] = useState(0);
  //for the upi section   

  const changeMethod = (e) => {
    if (method) {
     
      setMethod(false);
      setUpi('');
      setName("");
      setAccount_number("");
      setIfsc("");
      setMobile("");
      setAmount("");
      setCheckboxval("");
      setSelectName("");
    } else {
      setMethod(true);
      setName("");
      setUpi("");
      setMobile("");
      setAmount("");
      setAccount_number("");
      setIfsc("");
    }
  };

  const navigate = useRef(useNavigate());

  useEffect(() => {
    document.body.style.backgroundColor = "#e0e3e8";
    const token = localStorage.getItem("token");
    Auth().then((data) => {
      if (!data.auth) {
        navigate.current("/login");
      }
    });
    fetch("http://localhost:5000/getbanks", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((finalData) => {
        setPayee(finalData);
      });
  }, []);
  let opt = [];
  if (Payee[0]) {
    Object.values(Payee).map((val, index) => {
      val.value = val._id;
      val.label = val.name + " " + val.bank_name;
      opt.push(val);
    });
  }

  const handlePay = () => {
    document.getElementById("contain").style.display = "block";
    document.body.style.backgroundColor = "rgba(0,0,0,0.5)";
    document.getElementById("payCard1").style.visibility = "hidden";
    document.getElementById("payCard2").style.visibility = "hidden";
  };

  const closeModal = () => {
    document.body.style.backgroundColor = "#e0e3e8";
    document.getElementById("contain").style.display = "none";
    document.getElementById("payCard1").style.visibility = "visible";
    document.getElementById("payCard2").style.visibility = "visible";
  };

  const initPayment = (data) => {
    const token = localStorage.getItem("token");
    const options = {
      key: "rzp_live_OEtqVhgDuLje5D",
      amount: 1,
      currency: "INR",
      name: "FiePay",
      description: "Rent or Maintanance",
      image: {Logo},
      prefill: {
        contact:mobile,
      },
      order_id: data.id,
      handler: async (response) => {
        try {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;
          const verifyUrl = "http://localhost:5000/api/payment/verify";
          const { data } = await axios.post(
            verifyUrl,
            {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
              notes: {
                name: Name,
                bank_account: account_number,
                ifsc: ifsc,
                mobile: mobile,
                amount: amount,
                upi: upi,
                purpose:purpose,
              },
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(data);
          if (data.auth) {
            document.body.style.backgroundColor = "#e0e3e8";
            document.getElementById("contain").style.display = "none";
            document.getElementById("payCard1").style.visibility = "visible";
            document.getElementById("payCard2").style.visibility = "visible";
          }
        } catch (error) {
          console.log(error);
          console.log("failed");
        }
      },
      theme: {
        color: "#1a0101",
      },
      notes: {
        name:Name,
        bank_account:account_number,
        ifsc:ifsc,
        mobile:mobile,
        upi:upi,
        purpose:purpose,
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePaymentBank = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
      if ( Name.trim() === "" ||account_number.trim() === "" ||ifsc.trim() === "" || mobile.trim() === "" || amount.trim() === "" || purpose.trim() === "" ) {
        toast.error("Please fill all the details !");
        return;
      }
      if (amount>100) {
        toast.error("Minimum amount must be greater than or 100");
        return;
      }else {
          try {
            const orderUrl = "http://localhost:5000/api/payment/orders";
            const { data } = await axios.post(
              orderUrl, { amount: amount }, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`, },}
            );
            initPayment(data.data);
          } catch (error) {
            console.log(error);
          }
        }
  };

const handlePaymentUpi = async(e)=>{
  const token = localStorage.getItem("token");
    e.preventDefault();
    if ( Name.trim() === "" || upi.trim() === "" || mobile.trim() === "" || amount.trim() === "" || purpose.trim() === ''){
      // alert("Please fill all the details");
     toast.error("Please fill all the details !");
    }else{
    if (amount>100) {
      // alert('please enter amount more than 100');
      toast.error("Minimum amount must be greater than or 100");
      return;
    }
      try {
        const orderUrl = "http://localhost:5000/api/payment/orders";
        const { data } = await axios.post(
          orderUrl,
          { amount: amount },
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          }
        );
        initPayment(data.data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }


}

const handleForm = (e) => {
    setSelectName(e.target.value);
    const name = e.target.querySelector(":checked").getAttribute("data-name");
    const account_number = e.target.querySelector(":checked").getAttribute("data-accountnumber");
    const ifsc = e.target.querySelector(":checked").getAttribute("data-ifsc");
    const mobile = e.target.querySelector(":checked").getAttribute("data-mobile");
    const upi = e.target.querySelector(":checked").getAttribute("data-upi");

    if (e.target.value !== "") {
      setName(name);
      setAccount_number(account_number);
      setAmount(amount);
      setIfsc(ifsc);
      setMobile(mobile);
      setUpi(upi);
    }
  };

const handleAmount = (e)=>{
  setAmount(e.target.value);
  const amount =  parseInt(e.target.value);
  setPrimaryAmount(amount);
}

let inputTypeNumbers = document.querySelectorAll("input[type=number]");
inputTypeNumbers.forEach((ele)=>{
  ele.onwheel = function (event) {
    event.target.blur();
};})
  return (
    <>
    <div className="container">
      <Header ShowImg={true} title={"Pay Merchant or Rent"}></Header>
      <Toaster/>
      <div className="mt-4 container">
        <div className="row d-flex justify-content-center">
          <div className="contain" id="contain" style={{ display: "none", zIndex: "10" }} >
            <div className="cookiesContent" id="cookiesPopup">
              <button onClick={closeModal} id="close" className="close">
                ✖
              </button>
              <div className="appContent1 pb-5 mt-1">
                <input value={checkboxval} onChange={changeMethod} type="checkbox" id="incDec" />
                  {method ? <div>
                    <div className="select">
                      <select name="SelectName" value={SelectName} onChange={handleForm} >
                        <option value=""> Select a bank</option>
                        {opt.map((value, index) => {
                          if (value.accountType==="bank") {
                            return (
                              <option value={value._id} key={index} data-name={value.name} data-accountnumber={value.account}
                                data-mobile={value.mobile} data-ifsc={value.ifsc} data-upi={value.account} >
                                {value.name + " " + value.bank_name}
                              </option> );
                          }
                           })}
                      </select>
                    </div>

                    <div className="form-group floating mt-3">
                      <label>
                        Actual Name<i className="text-danger">*</i>
                      </label>
                      <input type="text" className="form-control floating"
                        name="name" value={Name} onChange={(e) => { setName(e.target.value); }}
                        required autoComplete="off" placeholder="Name" />
                    </div>
                    <div className="form-group floating">
                          <label>
                            Bank Account<i className="text-danger">*</i>
                          </label>
                          <input type="number" className="form-control floating"
                            name="account_number" value={account_number}  
                            onChange={(e) => { setAccount_number(e.target.value); }} autoComplete="off" placeholder="Account Number" />
                        </div>
                        <div className="form-group floating">
                          <label>
                            IFSC <i className="text-danger">*</i>
                          </label>
                          <input style={{textTransform:"uppercase"}}  type="text" className="form-control floating"
                            name="ifsc" value={ifsc} onChange={(e) => { setIfsc(e.target.value); }}
                            autoComplete="off" placeholder="IFSC Code" />
                        </div>
                    <div className="form-group floating">
                      <label>
                        Mobile<i className="text-danger">*</i>
                      </label>
                      <input type="number" className="form-control floating" name="mobile" value={mobile}
                        onChange={(e) => setMobile(e.target.value)} maxLength={10} required autoComplete="off" placeholder="Mobile Number" />
                    </div>
                    <div className="form-group floating">
                      <label>
                        Amount <i className="text-danger">*</i>
                      </label>
                      <input type="number" className="form-control floating" name="amount"
                        value={amount} onChange={handleAmount} required autoComplete="off" placeholder="Amount" />
                    <p style={{fontSize:"11px",color:"#1b2c42"}}>You will get: {primaryAmount - (primaryAmount*5)/100-2}</p>
                    </div>
                    <div className="form-group floating">
                      <label>
                        Purpose<i className="text-danger">*</i>
                      </label>
                      <input type="text" className="form-control floating" name="purpose" value={purpose}
                        onChange={(e) => setPurpose(e.target.value)} required autoComplete="off" placeholder="e.g. Rent Payment" />
                   <p style={{fontSize:"11px",color:"#1b2c42"}}>Note : 5% fees will be charged</p>
                    </div>
                   
                    <div className="d-flex justify-content-center text-center mt-1">
                      <button onClick={handlePaymentBank} type="submit" className="btn" style={{ width: "264px",backgroundColor:"#226371", borderColor:"#226371", color:"white"}}  >
                         Pay Now
                      </button>
                    </div>
                    </div> :
                     <div>
                     <div className="select">
                       <select name="SelectName" value={SelectName} onChange={handleForm} >
                         <option value=""> Select a UPI</option>
                         {opt.map((value, index) => {
                           if(value.accountType === "upi"){
                            return (
                              <option value={value._id} key={index} data-name={value.name} data-accountnumber={value.account}
                                data-mobile={value.mobile} data-ifsc={value.ifsc} data-upi={value.account} >
                                {(value.name + " " + value.account)}
                              </option> );
                           }
                            })}
                       </select>
                     </div>
                     <div className="form-group floating mt-3">
                       <label>
                         Actual Name<i className="text-danger">*</i>
                       </label>
                       <input type="text" className="form-control floating"
                         name="name" value={Name} onChange={(e) => { setName(e.target.value); }}
                         required autoComplete="off" placeholder="Name" />
                     </div>
                     <div className="form-group floating">
                           <label>
                             UPI<i className="text-danger">*</i>
                           </label>
                           <input type="text" className="form-control floating"
                             name="upi" value={upi}  
                             onChange={(e) => { setUpi(e.target.value); }} autoComplete="off" placeholder="e.g username@bank" />
                         </div>
                     <div className="form-group floating">
                       <label>
                         Mobile<i className="text-danger">*</i>
                       </label>
                       <input type="number" className="form-control floating" name="mobile" value={mobile}
                         onChange={(e) => setMobile(e.target.value)} maxLength={10} required autoComplete="off" placeholder="Mobile Number" />
                     </div>
                     <div className="form-group floating">
                      <label>
                        Amount <i className="text-danger">*</i>
                      </label>
                      <input type="number" className="form-control floating" name="amount"
                        value={amount} onChange={handleAmount} required autoComplete="off" placeholder="Amount" />
                    <p style={{fontSize:"11px",color:"#1b2c42"}}>You will get: {primaryAmount - (primaryAmount*5)/100-2}</p>
                    </div>
                    <div className="form-group floating">
                      <label>
                        Purpose<i className="text-danger">*</i>
                      </label>
                      <input type="text" className="form-control floating" name="purpose" value={purpose}
                        onChange={(e) => setPurpose(e.target.value)} required autoComplete="off" placeholder="e.g. Rent Payment" />
                   <p style={{fontSize:"11px",color:"#1b2c42"}}>Note : 5% fees will be charged</p>
                    </div>
                     <div className="d-flex justify-content-center text-center mt-1">
                       <button onClick={handlePaymentUpi} type="submit" className="btn" style={{ width: "264px",backgroundColor:"#226371",borderColor:"#226371",color:"white" }}  >
                          Pay Now
                       </button>
                     </div>
                     </div>
                  }
               
               </div>
            </div>
          </div>
          <div id="payCard1" style={{ textAlign: "center", maxWidth: "450px" }} className="col text-align-center" >
            <div style={{ boxShadow: "0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)", }} className="card mb-3">
              <div className="card-body">
                <img style={{ width: "100px", height: "100px", filter: "invert(60%)", }} src={Rent}
                  alt="rent" />
                <strong>
                  <p>
                    Pay Rent, Rent advance and Maintenance on your Credit card
                  </p>
                </strong>

                <button onClick={handlePay} style={{ outline: "none",borderColor:"#226371",color:"#226371" }} className="btn" >
                  Pay Rent
                </button>
              </div>
            </div>
          </div>
        </div>

        <div id="payCard2" className="row justify-content-center">
          <div style={{ textAlign: "center", maxWidth: "450px" }}
            className="col text-align-center" >
            <div
              style={{ boxShadow: "0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)", }}
               className="card mb-3" >
              <div className="card-body">
                <img style={{ width: "100px", height: "100px", filter: "invert(60%)", }} src={Maintanance} alt="maintanance"/>
                <strong>
                  <p>
                    Pay all your bills here - Education fees, Vendor Payments,
                    Purchases etc.
                  </p>
                </strong>
                <button onClick={handlePay} style={{ outline: "none",borderColor:"#226371",color:"#226371" }} className="btn" >
                  Bill Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer cl2={"item active"} />
      </div>
    </>
  );
};

export default Pay;

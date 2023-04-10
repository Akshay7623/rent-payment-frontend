import React, { useState, useRef, useEffect } from "react";
import Loading from './image/loading1.png';
import toast, {Toaster} from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import Auth from "./Auth";


const AddBank = () => {
  const [myvalue, setMyValue] = useState({
    name: "",
    ifsc: "",
    bank: "",
    account: "",
    mobile: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  function validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  const navigate = useRef(useNavigate());
  useEffect(() => {
    Auth().then((data) => {
      if (!data.auth) {
        navigate.current("/login");
      }
    });
  }, []);

  

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setMyValue({ ...myvalue, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(myvalue.name.trim()===''||myvalue.ifsc.trim()===''||myvalue.bank.trim()===''||myvalue.account.trim()===''||myvalue.mobile.trim()===''||myvalue.email.trim()===''){
      toast.error("Please fill all details !");
      return;
    }
    if (myvalue.mobile.trim().length!==10) {
      toast.error("Please enter valid mobile number !");
      return;
    }
    if (!validateEmail(myvalue.email)) {
      toast.error("Please enter valid email !");
      return;
    }
    const token = localStorage.getItem("token");
    const data = await fetch("http://localhost:5000/addbank", {
      method: "post",
      body: JSON.stringify({
        name: myvalue.name.trim(),
        ifsc: myvalue.ifsc.trim(),
        bank_name: myvalue.bank,
        account: myvalue.account.trim(),
        mobile: myvalue.mobile.trim(),
        email: myvalue.email.trim(),
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    const result = await data.json();
    if (result.message === "SUCCESS") {
      toast.success("Successfully added");
      setTimeout(()=>{
        navigate.current("/bank");
      },1200)
    } else if (result.message === "DATA_EXIST") {
      toast.error("This bank account has been already added !");
    }else if (result.message === "LIMIT") {
      toast.error("You can't add more than 4 accounts !");
    } else {
      toast.error("Some server error accured !");
    }
  };

  let inputTypeNumbers = document.querySelectorAll("input[type=number]");
    inputTypeNumbers.forEach((ele)=>{
      ele.onwheel = function (event) {
        event.target.blur();
    };})

  return (
    <>
    <div className="container">
    <Toaster />
     <Header showImg={false} title={"Add Bank Account"} redirect={"/bank"} />
      <div className="pb-2">
        <div className="appContent1 pb-5">
            <div className="form-group floating mt-3">
              <label>
                Actual Name<i className="text-danger">*</i>
              </label>
              <input type="text" className="form-control floating" name="name"
                value={myvalue.name} onChange={handleInput} required autoComplete="off" placeholder="Name" />
            </div>
            <div className="form-group floating">
              <label>
                Acoount Number<i className="text-danger">*</i>
              </label>
              <input type="number" className="form-control floating" name="account"
                value={myvalue.account} onChange={handleInput} autoComplete="off" placeholder="Account number" required />
            </div>
            <div className="form-group floating">
              <label>
                IFSC Code<i className="text-danger">*</i>
              </label>
              <input style={{textTransform:"uppercase"}} type="text" className="form-control floating" name="ifsc" placeholder="IFSC code" required value={myvalue.ifsc}
                onChange={handleInput} autoComplete="off" />
            </div>
            <div className="form-group floating">
              <label>
                Bank Name<i className="text-danger">*</i>
              </label>
              <input type="text" className="form-control floating" name="bank"
                value={myvalue.bank} onChange={handleInput} autoComplete="off" placeholder="Bank name" required />
            </div>
            <div className="form-group floating">
              <label>
                Mobile<i className="text-danger">*</i>
              </label>
              <input type="number" className="form-control floating" name="mobile" value={myvalue.mobile}
                onChange={handleInput} maxLength={10} autoComplete="off" placeholder="Mobile number" required />
            </div>
            <div className="form-group floating">
              <label>
                Email id<i className="text-danger">*</i>
              </label>
              <input type="text" className="form-control floating" name="email"
                value={myvalue.email} onChange={handleInput} autoComplete="off" placeholder="E-mail id" required />
            </div>
            <div className="d-flex justify-content-center text-center mt-1">
              <button onClick={handleSubmit} type="submit"
                className="btn btn-primary" style={{ width: "264px",backgroundColor:"rgb(34 99 113)",border:"none" }} >Save
              </button>
            </div>
        </div>
      </div>
      <Footer cl4={"item active"} />
      </div>
    </>
  );
};

const AddUpi = () => {

  function validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  const [myvalue, setMyValue] = useState({
    name: "",
    upi: "",
    mobile: "",
    email: "",
  });

  const navigate = useRef(useNavigate());
  useEffect(() => {
    Auth().then((data) => {
      if (!data.auth) {
        navigate.current("/login");
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
    if (myvalue.name.trim()==''|| myvalue.upi.trim()==''|| myvalue.mobile.trim()==''|| myvalue.email.trim()=='') {
      toast.error("Please fill all details !");
      return;
    }
    if (myvalue.mobile.trim().length!==10) {
      toast.error("Please enter valid mobile number !")
      return;
    }
    if (!validateEmail(myvalue.email)) {
      toast.error("Please enter valid email !")
      return;
    }

   const token = localStorage.getItem("token");
   const data = await fetch("http://localhost:5000/addupi", {
     method: "post",
     body: JSON.stringify({
       name: myvalue.name.trim(),
       upi:myvalue.upi.trim(),
       mobile: myvalue.mobile.trim(),
       email: myvalue.email.trim(),
     }),
     headers: {
       "Content-Type": "application/json",
       "Authorization": `Bearer ${token}`,
     },});

   const result = await data.json();
   if (result.message === "SUCCESS") {
     toast.success("added successfully");
     setTimeout(() => {
       navigate.current("/bank");
     }, 1200);
   } else if (result.message === "DATA_EXIST") {
     toast.error("this UPI account has been already added !");
   }else if (result.message === "LIMIT") {
    toast.error("You can't add more than 4 accounts !");
  } else {
     toast.error("please fill all data");
   }
  };

  let inputTypeNumbers = document.querySelectorAll("input[type=number]");
    inputTypeNumbers.forEach((ele)=>{
      ele.onwheel = function (event) {
        event.target.blur();
    };})
  return (
    <>
    <div className="container">
    <Toaster />
      <Header showImg={false} title={"Add UPI"} redirect={"/bank"} />
      <div className="pb-2">
        <div className="appContent1 pb-5">
          <div className="form-group floating mt-3">
              <label>
                Actual Name<i className="text-danger">*</i>
              </label>
              <input type="text" className="form-control floating" name="name"
                value={myvalue.name} onChange={handleInput} required placeholder="Name" autoComplete="off" />
            </div>
            <div className="form-group floating">
              <label>
                UPI Id<i className="text-danger">*</i>
              </label>
              <input type="text" className="form-control floating" name="upi" value={myvalue.upi}
                onChange={handleInput} required placeholder="UPI Id" autoComplete="off" />
            </div>
            <div className="form-group floating">
              <label>
                Mobile<i className="text-danger">*</i>
              </label>
              <input
                type="number" className="form-control floating" name="mobile" value={myvalue.mobile} onChange={handleInput}
                maxLength={10} required placeholder="Mobile" autoComplete="off" />
            </div>
            <div className="form-group floating">
              <label>
                Email id<i className="text-danger">*</i>
              </label>
              <input type="email" className="form-control floating" name="email" value={myvalue.email}
                onChange={handleInput} required placeholder="Email Id" autoComplete="off" />
            </div>
            <div className="d-flex justify-content-center text-center mt-1">
              <button onClick={handleSubmit} type="submit" className="btn btn-primary"  style={{ width: "264px",backgroundColor:"rgb(34 99 113)",border:"none"  }}>
                Save
              </button>
            </div>
        </div>
      </div>
      <Footer cl4={"item active"} />
      </div>
    </>
  );
};

const Bank = () => {
  const timelineLoaded = useRef(false);
  const [Bankdata, SetBankdata] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useRef(useNavigate());
  const hanldeDelete = async(e)=>{
    const token = localStorage.getItem("token");
    const id = e.target.id;
    const Delete = await fetch('http://localhost:5000/deletebank',{
      method: "post",
      body:JSON.stringify({id:id}),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    const data = await Delete.json();
    if (data.success) {
      toast.success("Bank account Deleted successfully ");
    }else{
      toast.error("Something went wrong !");
    }
    fetch("http://localhost:5000/showbank", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    }).then((userdata) => {
        return userdata.json();
      }).then((users) => {
        SetBankdata(users);
      });
  }



  useEffect(() => {

    if (!timelineLoaded.current) {
    Auth().then((data) => {
      if (!data.auth) {
        navigate.current("/login");
      }
    });

    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/showbank", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    }).then((userdata) => {
        return userdata.json();
      }).then((users) => {
        SetBankdata(users);
        setLoading(false);
      });
      timelineLoaded.current = true;
    }
  }, [hanldeDelete]);


 
  return (
    <>
    <div className="container">
    <Toaster />
      <Header showImg={false} title={"Bank Card"} redirect={"/account"} ></Header>
     <div className="pb-2">
        <div className="appContent1 pb-5">
          <ul style={{backgroundColor:"#e0e3e8"}} className="nav nav-tabs size2" role="tablist">
            <li  className="nav-item">
              <a style={{ borderRadius: "10px"}} className="nav-link active" data-toggle="tab" href="#bank" role="tab" >
                Bank Account
              </a>
            </li>
          </ul>
          <div className="mt-1">
            <div className="tab-content">
              <div className="tab-pane fade active show" id="bank" role="tabpanel" >
                <div className="mb-2 pr-1">
                  <NavLink to="/addbank" style={{color:"#226371"}}>
                    <i className="fa fa-plus" /> Add Bank
                  </NavLink>
                  <NavLink
                    to="/addupi"
                    style={{ float: "right",color:"#226371" }}
                  >
                    <i className="fa fa-plus" /> Add UPI Id
                  </NavLink>
                </div>

                {Bankdata[0] ?
                 
                Object.values(Bankdata).map((value, index) => {
                  return (
                    <div style={{boxShadow:"0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)",}} className="card mb-3" key={index}>
                        <div className="card-body">
                          <h5 className="card-title">{value["bank_name"]}</h5>
                          <p style={{color:"#226371"}}>
                            <strong>{value["account"]}</strong>
                          </p>
                          <p>{value["ifsc"]}</p>
                          <p>{value["name"]}</p>
                          <p>{value["mobile"]}</p>
                          <p>
                            {value["email"]}
                            <i style={{cursor:"pointer"}} id={value["_id"]} onClick={hanldeDelete} className="fa fa-trash text-danger pull-right" />
                          </p>
                        </div>
                      </div>
                    );
                }): 
                <div>
      {loading ? <div className="loading-box"><img  className="rotating loading-img" src={Loading} /></div>: <h6>No bank account available</h6>   }
                </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer cl4={"item active"} />
      </div>
    </>
  );
};

export default Bank;
export { AddBank, AddUpi };
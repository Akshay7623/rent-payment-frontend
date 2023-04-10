import React,{useState,useEffect,useRef} from 'react'
import { useNavigate } from 'react-router'
import { NavLink } from 'react-router-dom'
import './pagination.css';
import AdminAuth from './AdminAuth'
// import ReactHTMLTableToExcel from 'react-html-table-to-excel';


const Payments = () => {
  const [userData,setUserData] = useState({});
  const [adminData,setAdminData] = useState({
        DeletedBank : 0,
        activeBank :0,
        paymentCompleted:0,
        remainPay :0,
        totalUser :0,
        });
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;
  // const total = ;
  const [total,setTotal] = useState();

  const totalPage = Math.ceil(total / perPage);
  let token = localStorage.getItem("adminToken");
  const navigate = useRef(useNavigate());
 
  const hanldePrev = () => {
    if (currentPage>1 ) {
      setCurrentPage(currentPage-1);
      console.log('page number is ', currentPage-1);
      fetch("http://localhost:5000/admin/getpayments", {
        method: "POST",
        body: JSON.stringify({
          pageNumber: currentPage - 1,
          userPerPage: perPage,
          paid: 0,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          setUserData(data);
        });
    }
  }

  const hanldeNext = () => {
    if (totalPage === currentPage ) {
      console.log('Can not go ahead !');
    }else{
      setCurrentPage(currentPage+1);
      console.log('page number is ', currentPage+1);
      fetch("http://localhost:5000/admin/getpayments", {
        method: "POST",
        body: JSON.stringify({
          pageNumber: currentPage + 1,
          userPerPage: perPage,
          paid: 0,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          setUserData(data);
        });
    }
  }


  const controllNav = ()=>{
    document.getElementById('mySidenav').style.width="70px";
    document.getElementById("main").style.marginLeft="70px";
    document.getElementsByClassName('logo')[0].style.visibility= "hidden";
    document.getElementById('LogoSpan').style.visibility= "visible";
    document.getElementById('LogoSpan').style.marginLeft= "-10px";
    let htmlcollection = document.getElementsByClassName('icon-a');
    let arr = Array.from(htmlcollection);
    arr.forEach(x => { x.style.visibility='hidden' });
    let htmlCollection1 = document.getElementsByClassName('icons');
    let arr1 =  Array.from(htmlCollection1);
    arr1.forEach((x)=>{
      x.style.visibility='visible';
      x.style.marginLeft='-8px';
    })
    document.getElementsByClassName('nav')[0].style.display= "none";
    document.getElementsByClassName('nav2')[0].style.display= "block";
}


const controllNav2 = ()=>{
  document.getElementById('mySidenav').style.width="300px";
  document.getElementById("main").style.marginLeft="300px";
  document.getElementsByClassName('logo')[0].style.visibility= "visible";
  let htmlcollection = document.getElementsByClassName('icon-a');
  let arr = Array.from(htmlcollection);
  arr.forEach(x => { x.style.visibility='visible'});
  let htmlCollection1 = document.getElementsByClassName('icons');
  let arr1 =  Array.from(htmlCollection1);
  arr1.forEach((x)=>{ x.style.visibility='visible' })
  document.getElementsByClassName('nav')[0].style.display= "block";
  document.getElementsByClassName('nav2')[0].style.display= "none";
}

const Logout = ()=>{
  localStorage.clear();
  AdminAuth().then((data)=>{
    if (data.message!=="VALID") {
      navigate.current('/admin/login');
    }
  })
}

const haldeMarkPaid = (e)=>{

  fetch('http://localhost:5000/admin/markpaid', 
  { 
  method: 'PATCH',
  body:JSON.stringify({id:e.target.id}),
  headers: {
    'Content-Type': 'application/json',
    "Authorization" :`Bearer ${token}`,
  },
}).then(response => response.json()) .then(data => {
    // Do something with the response data
          
fetch("http://localhost:5000/admin/getpayments", {
  method: "POST",
  body:JSON.stringify({pageNumber:currentPage,userPerPage:perPage,paid:0}),
  headers: { "Content-Type": "application/json",
             "Authorization": `Bearer ${token}` } })
             .then(function(response) { return response.json() }).then(function(data) {
  setUserData(data);
})
  });
}


const CustomStyle = {backgroundColor:"#1b203d"};

  const handleSearch = ()=>{
    let search = document.getElementById("search").value;
    if(search.trim()!==''){
      fetch("http://localhost:5000/admin/searchpayment", {
        method: "POST",
        body: JSON.stringify({
          pageNumber: 1,
          userPerPage: perPage,
          search:search
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          setUserData(data);
          let size = Object.keys(data).length;
          setTotal(size);
        });
    }
  }


useEffect(() => {
    document.body.style.backgroundColor="#1b203d";
    AdminAuth().then((data)=>{
      if (data.message!=="VALID") {
        navigate.current('/admin/login');
      }})

  fetch("http://localhost:5000/admin/getpayments", {
    method: "POST",
    body: JSON.stringify({ pageNumber:currentPage, userPerPage: perPage, paid: 0}),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      setUserData(data);
    });

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
      
      setTotal(data.remainPay);
    });
    
  }, [])


  return (
    <>
     <div id="mySidenav" className="sidenav">
          <p className="logo"><span id="LogoSpan"></span>Razpay</p>
          <NavLink to="/admin/dashboard" className="icon-a">  <i className="fa fa-hashtag icons" /> Dashboard </NavLink>
          <NavLink to="/admin/users" className="icon-a">  <i className="fa fa-users icons" /> Users </NavLink>
          <NavLink style={CustomStyle} to="/admin/payments" className="icon-a">  <i className="fa fa-money icons" /> Payments </NavLink>
          <NavLink to="/admin/banks" className="icon-a">  <i className="fa fa-list-alt icons" /> Banks </NavLink>
          <NavLink onClick={Logout} className="icon-a">  <i className="fa fa-sign-out icons" /> Logout </NavLink>
        </div>
        <div id="main">
          <div className="head">
            <div className="col-div-4">
              <span style={{fontSize: '30px', cursor: 'pointer', color: 'white'}} className="nav" onClick={controllNav}>☰ Payments </span>
              <span style={{fontSize: '30px', cursor: 'pointer', color: 'white'}} className="nav2" onClick={controllNav2}>☰ Payments </span>
            </div>
            <div className="col-div-4">
              <div className="profile">
                <p>Hello Admin !</p>
              </div>
            </div>
            <div className="col-div-4">
              <div>
              <input id="search" className="searchUserInput" type="text" placeholder="Search transaction here "/>
              <button onClick={handleSearch} className="search-btn"> Search</button>
              </div>
            </div>
          
          </div>

          <br />
          <br/><br/>

          

        <div className="container-fluid mt-5 mb-5">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="card">
                <div className="card-body p-0">
                <div className="dFlex"> 
                  <i className="fa fa-arrow-left" onClick={hanldePrev}></i>
                  <p className="Show-title">Showing {currentPage * perPage-(perPage-1)}-{currentPage * perPage} of {total}</p>
                  <i onClick={hanldeNext}  className="fa fa-arrow-right"></i>    
                  </div>
                  <div className="table-responsive">
                    <table id="table-to-xls" className="table table-text-small mb-0">
                      <thead className="thead-primary table-sorting"><tr>
                        <th>Name</th>
                        <th>Account Number</th>
                        <th>IFSC</th>
                        <th>Number</th>
                        <th>Amount</th>
                        <th>Time</th>
                        <th>Order Id</th>
                        <th>Mark Paid </th>
                        </tr>
                        </thead>
                      <tbody id='tbody'>
                      {Object.values(userData).map((value,index)=>{
                        return(
                          <tr key={index}>
                            <td>{value.name}</td>
                            <td>{value.bank_account}</td>
                            <td>{value.ifsc}</td>
                            <td>{value.mobile}</td>
                            <td>{value.amount}</td>
                            <td>{value.paymentCreatedAt}</td>
                            <td>{value.orderId}</td>
                            <td><button onClick={haldeMarkPaid} id={value._id}>Mark Paid</button></td>
                          </tr>
                        )
                      })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="table-to-xls"
                    filename="payments"
                    sheet="tablexls"
                    buttonText="Download as XLS"/> */}
          </div>
        </div>

        </div>
    </>
  )
}

export default Payments
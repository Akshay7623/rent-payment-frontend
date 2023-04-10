import React from 'react';
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Bank, {AddBank,AddUpi} from './Components/Bank';
import Account from './Components/Account';
import Profile, {EditProfile} from './Components/Profile';
import HistoryIn from './Components/HistoryIn';
import Login from './Components/Login';
import Signup from './Components/Signup';
import EnterOtp from './Components/EnterOtp';
import ForgotPass from './Components/ForgotPass';
import Pay from './Components/Pay';
import History from './Components/History';
import ResetPass from './Components/ResetPass';
import ResetPassIn from './Components/ResetPassIn';
import TandC, {AboutUs, ContactUs} from './Components/TandC';
import PassEnterOtp from './Components/PassEnterOtp';
import Privacy from './Components/Privacy';
import Admin from './Components/Admin/Admin';
import User from './Components/Admin/Users';
import Payments from './Components/Admin/Payments';
import Banks from './Components/Admin/Banks';
import AdminLogin from './Components/Admin/Login';
import Page404 from './Components/Page404';
import './index.css';


const App = ()=> {
  return (
    <>
    <Router>
    <Routes>
    <Route exact path='/' element={< Signup />}></Route>
    <Route exact path='/privacy' element={< Privacy />}></Route>
    <Route exact path='/home' element={< Home />}></Route>
    <Route exact path='/passenterotp' element={< PassEnterOtp />}></Route>
    <Route exact path='/historyin' element={< HistoryIn/>}></Route>
    <Route exact path='/pay' element={< Pay />}></Route>
    <Route exact path='/history' element={< History />}></Route>
    <Route exact path='/tandc' element={< TandC />}></Route>
    <Route exact path='/aboutus' element={< AboutUs />}></Route>
    <Route exact path='/contactus' element={< ContactUs />}></Route>
    <Route exact path='/profile' element={< Profile />}></Route>
    <Route exact path='/editprofile' element={< EditProfile />}></Route>
    <Route exact path='/resetpwd' element={< ResetPassIn />}></Route>
    <Route exact path='/bank' element={< Bank />}></Route>
    <Route exact path='/addbank' element={< AddBank />}></Route>
    <Route exact path='/addupi' element={< AddUpi />}></Route>
    <Route exact path='/account' element={< Account />}></Route>
    <Route exact path='/login' element={< Login />}></Route>
    <Route exact path='/enterotp' element={< EnterOtp />}></Route>
    <Route exact path='/forgotpass' element={< ForgotPass />}></Route>
    <Route exact path='/resetpass' element={< ResetPass />}></Route>
    <Route exact path='/admin/dashboard' element={< Admin />}></Route>
    <Route exact path='/admin/users' element={< User />}></Route>
    <Route exact path='/admin/payments' element={< Payments />}></Route>
    <Route exact path='/admin/banks' element={< Banks />}></Route>
    <Route exact path='/admin/login' element={< AdminLogin />}></Route>
    <Route exact path='/*' element={< Page404 />}></Route>

    </Routes>
    </Router>
    </>
  );
}

export default App;